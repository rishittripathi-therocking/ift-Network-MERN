import {PROFILE_TYPES} from '../actions/profileAction';
import {EditData} from '../actions/globalType';


const initial = {
    loading: false,
    users: [],
    posts:[]
}

const profileReducer =(state=initial,action) => {
    switch(action.type){
        case PROFILE_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case PROFILE_TYPES.GET_USER:
            return {
                ...state,
                users: [...state.users,action.payload.user]
            };
        case PROFILE_TYPES.FOLLOW:
            return {
                ...state,
                users: EditData(state.users, action.payload._id, action.payload) 
            };
        case PROFILE_TYPES.UNFOLLOW:
            return {
                ...state,
                users: EditData(state.users, action.payload._id, action.payload) 
            };
        default:
            return state;
    }
}

export default profileReducer;

