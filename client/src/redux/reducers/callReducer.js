import { GLOBALTYPES } from '../actions/globalType'


const callReducer = (state = null, action) => {
    switch (action.type){
        case GLOBALTYPES.CALL:
            return action.payload;
        default:
            return state;
    }
}


export default callReducer