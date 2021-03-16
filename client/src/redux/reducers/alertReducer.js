import { GLOBALTYPES } from '../actions/globalType';

const initial ={}

const alertReducer = (state = initial, action) => {
    switch(action.type){
        case GLOBALTYPES.ALERT:
            return action.payload;
        default:
            return state;
    }
}

export default alertReducer;