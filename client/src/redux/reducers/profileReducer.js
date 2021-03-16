import {PROFILE_TYPES} from '../actions/profileAction';


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
        default:
            return state;
    }
}

export default profileReducer;

