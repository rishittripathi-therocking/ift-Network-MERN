import {POST_TYPES} from '../actions/postAction';
import {DeleteData, EditData} from '../actions/globalType';

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
                posts: [ action.payload,...state.posts]
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
        case POST_TYPES.UPDATE_POST:
            return {
                ...state,
                posts: EditData(state.posts, action.payload._id, action.payload)
            };
            case POST_TYPES.DELETE_POST:
                return {
                    ...state,
                    posts: DeleteData(state.posts,action.payload.post._id)
                };
        default:
            return state;
    }
}

export default postReducer;