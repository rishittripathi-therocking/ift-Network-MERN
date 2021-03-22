import {POST_DISCOVER_TYPES} from '../actions/postDiscoverAction';

const initial = {
    posts: [],
    loading: false,
    result: 0,
    page: 2
}

const postDiscoverReducer = (state = initial, action) => {
    switch(action.type){
        case POST_DISCOVER_TYPES.LOADING_POST:
            return {
                ...state,
                loading: action.payload
            };
        case POST_DISCOVER_TYPES.GET_ALL_POSTS:
            
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result
            };
        case POST_DISCOVER_TYPES.GET_USER_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result
            };
        default:
            return state;
    }
}

export default postDiscoverReducer;