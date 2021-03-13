import { TYPES} from '../actions/authAction';

const initial ={}

const authReducer = (state = initial, action) => {
    switch(action.type){
        case TYPES.AUTH:
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;