import {SUGGESTION_TYPES} from '../actions/suggestionAction';

const initial = {
    loading: false,
    users: []
}

const suggestionsReducer = (state = initial, action) => {
    switch(action.type){
        case SUGGESTION_TYPES.LOADING_SUGGESTION:
            return {
                ...state,
                loading: action.payload
            }
        case SUGGESTION_TYPES.GET_USERS: 
            return {
                ...state,
                users: action.payload.users
            }
        default: 
            return state    
    }
}

export default suggestionsReducer;