import {POST_TYPES} from '../actions/postAction';

const initial = {
    posts: [],
    loading: false,
    result: 0,
    page: 2
}

const postReducer = (state = initial, action) => {
    switch(action.type){
        case POST_TYPES.CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        case POST_TYPES.LOADING_POST:
            return {
                ...state,
                loading: action.payload
            };
        case POST_TYPES.GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result
            };
        default:
            return state;
    }
}

export default postReducer;