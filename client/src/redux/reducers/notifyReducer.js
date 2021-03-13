import { TYPES } from '../actions/notifyAction';

const initial ={}

const notifyReducer = (state = initial, action) => {
    switch(action.type){
        case TYPES.NOTIFY:
            return action.payload;
        default:
            return state;
    }
}

export default notifyReducer;