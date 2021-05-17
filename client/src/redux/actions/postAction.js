import {GLOBALTYPES} from './globalType';
import {imageUpload} from '../../utils/imageUpload';
import {postDataAPI, getDataAPI, patchDataAPI ,deleteDataAPI} from '../../utils/fetchData';
import {createNotify ,removeNotify} from './notifyAction';


export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    DELETE_POST: 'DELETE_POST',
    GET_POST: 'GET_POST'
}

export const createPost = ({content, images, auth, socket}) => async(dispatch) => {
    let media = [];
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
        if(images.length > 0) {
            media = await imageUpload(images);
        }
        const res = await postDataAPI('posts', {content, images: media}, auth.token);
        dispatch({type: POST_TYPES.CREATE_POST, payload: {...res.data.newPost,user: auth.user}});
        
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}});

        //Notify
        const msg = {
            id: res.data.newPost._id,
            text: 'added a new post.',
            recipients: res.data.newPost.user.followers,
            url: `/post/${res.data.newPost._id}`,
            content,
            image: media[0].url
        }

        dispatch(createNotify({msg, auth, socket}))

    } catch(err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        dispatch({type:GLOBALTYPES.ALERT ,payload: {}});
    }
}


export const getPosts = (token) => async(dispatch) => {
    try {
        dispatch({type: POST_TYPES.LOADING_POST, payload: true});
        const res = await getDataAPI('posts',token);
        dispatch({type: POST_TYPES.GET_POSTS, payload: res.data});
        dispatch({type: POST_TYPES.LOADING_POST, payload:false});
    } catch(err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        dispatch({type:GLOBALTYPES.ALERT ,payload: {}});
    }
}

export const updatePost = ({content, images, auth,status}) => async(dispatch) => {
    let media = [];
    const imgNewUrl = images.filter(img => !img.url);
    const imgOldUrl = images.filter(img => img.url);
    const contBool = status.content === content;
    const imgOldBool = imgOldUrl.length === status.images.length;
    const imgNewBool = imgNewUrl.length === 0;
    if(contBool && imgOldBool && imgNewBool) return ;

    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
        if(imgNewUrl.length > 0) {
            media = await imageUpload(imgNewUrl);
        }
        const res = await patchDataAPI(`posts/${status._id}`, {content, images: [...imgOldUrl,...media]}, auth.token);
        dispatch({type: POST_TYPES.UPDATE_POST, payload: res.data.newPost});
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}});
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}});
        dispatch({type: GLOBALTYPES.ALERT, payload: {}});
    } catch(err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        dispatch({type:GLOBALTYPES.ALERT ,payload: {}});
    }
}


export const likePost = ({post, auth, socket}) => async(dispatch) => {
    
    const newPost = {...post, likes: [...post.likes,auth.user]}
    dispatch({type:POST_TYPES.UPDATE_POST, payload: newPost});
    socket.emit('likePost', newPost);
    try {
        await patchDataAPI(`/post/${post._id}/like`,null,auth.token);
        

    } catch(err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        dispatch({type:GLOBALTYPES.ALERT ,payload: {}});
    }
    
}

export const unlikePost = ({post, auth, socket}) => async(dispatch) => {
    
    const newPost = {...post, likes: post.likes.filter(like => like._id !== auth.user._id)}
    dispatch({type:POST_TYPES.UPDATE_POST, payload: newPost});

    socket.emit('unLikePost', newPost);
    try {
        await patchDataAPI(`/post/${post._id}/unlike`,null,auth.token);
        

    } catch(err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        dispatch({type:GLOBALTYPES.ALERT ,payload: {}});
    }
    
}

export const deletePost = ({post,auth, socket}) => async(dispatch) => {
    
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
        const res = await deleteDataAPI(`posts/${post._id}`, auth.token);
        dispatch({type: POST_TYPES.DELETE_POST, payload: {post}});
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}});
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}});
        dispatch({type: GLOBALTYPES.ALERT, payload:{}});
        const msg = {
            id: post._id,
            text: 'deleted the post.',
            recipients: res.data.newPost.user.followers,
            url: `/post/${post._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}));
    } catch(err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        dispatch({type:GLOBALTYPES.ALERT ,payload: {}});
    }
} 

export const getPost = ({detailPost, id, auth}) => async (dispatch) => {
    if(detailPost.every(post => post._id !== id)){
        try {
            const res = await getDataAPI(`posts/${id}`, auth.token);
            dispatch({type: POST_TYPES.GET_POST, payload: res.data.post});
            
        } catch(err) {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
            dispatch({type:GLOBALTYPES.ALERT ,payload: {}});
        }
    }
}

export const savePost = ({post,auth}) => async(dispatch) => {
    const newUser = {...auth.user, saved: [...auth.user.saved, post._id]};
    dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}});
    try {
        await patchDataAPI(`savePost/${post._id}`,null, auth.token);
    } catch(err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        dispatch({type:GLOBALTYPES.ALERT ,payload: {}});
    }
}

export const unsavePost = ({post,auth}) => async(dispatch) => {
    const newUser = {...auth.user, saved: auth.user.saved.filter(id => id !== post._id)};
    dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}});
    try {
        await patchDataAPI(`unsavePost/${post._id}`,null, auth.token);
    } catch(err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        dispatch({type:GLOBALTYPES.ALERT ,payload: {}});
    }
}

