import { GLOBALTPES } from '../actions/globalType';

const initial ={}

const authReducer = (state = initial, action) => {
    switch(action.type){
        case GLOBALTPES.AUTH:
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;