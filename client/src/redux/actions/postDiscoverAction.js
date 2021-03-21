import {GLOBALTYPES} from './globalType';
import {getDataAPI} from '../../utils/fetchData';


export const POST_DISCOVER_TYPES = {
    LOADING_POST: 'LOADING_POST',
    GET_ALL_POSTS: 'GET_ALL_POSTS',
}

export const getAllPosts = (token) => async(dispatch) => {
    try {
        dispatch({type: POST_DISCOVER_TYPES.LOADING_POST, payload: true});
        const res = await getDataAPI('all/posts',token);
        dispatch({type: POST_DISCOVER_TYPES.GET_ALL_POSTS, payload: res.data});
        dispatch({type: POST_DISCOVER_TYPES.LOADING_POST, payload:false});
    } catch(err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        dispatch({type:GLOBALTYPES.ALERT ,payload: {}});
    }
}