import {POST_TYPES} from '../actions/postAction';

const initial = {
    posts: []
}

const postReducer = (state = initial, action) => {
    switch(action.type){
        case POST_TYPES.CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
            default:
                return state;
    }
}

export default postReducer;