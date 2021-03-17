import { GLOBALTYPES } from '../actions/globalType';

const initial = false

const statusReducer = (state = initial, action) => {
    switch(action.type){
        case GLOBALTYPES.STATUS:
            return action.payload;
        default:
            return state;
    }
}

export default statusReducer;