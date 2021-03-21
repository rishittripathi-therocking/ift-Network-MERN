import {GLOBALTYPES} from './globalType';
import {POST_TYPES} from './postAction';
import {postDataAPI} from '../../utils/fetchData';


export const createComment = (post,newComment,auth) => async(dispatch) => {
    
    const newPost = {...post, comments: [...post.comments, newComment]}
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost});
    try{
        const data = {...newComment, postId: post._id}
        const res = await postDataAPI('comment',data,auth.token);
        const newData = {...res.data.newComment, user: auth.user};
        const newPost = {...post, comments: [...post.comments, newData]}
        dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost});
    } catch(err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        dispatch({type:GLOBALTYPES.ALERT ,payload: {}});
    }
}

