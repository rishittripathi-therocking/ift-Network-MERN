import { GLOBALTPES } from '../actions/globalType';

const initial ={}

const alertReducer = (state = initial, action) => {
    switch(action.type){
        case GLOBALTPES.ALERT:
            return action.payload;
        default:
            return state;
    }
}

export default alertReducer;