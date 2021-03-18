import { GLOBALTYPES } from '../actions/globalType';

const initial = false

const modeReducer = (state = initial, action) => {
    switch(action.type){
        case GLOBALTYPES.MODAL:
            return action.payload;
        default:
            return state;
    }
}

export default modeReducer;