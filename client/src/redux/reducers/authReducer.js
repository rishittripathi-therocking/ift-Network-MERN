import { GLOBALTYPES } from '../actions/globalType';

const initial ={}

const authReducer = (state = initial, action) => {
    switch(action.type){
        case GLOBALTYPES.AUTH:
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;