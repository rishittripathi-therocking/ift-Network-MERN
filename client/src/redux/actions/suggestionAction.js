import {GLOBALTYPES} from '../actions/globalType';
import {getDataAPI} from '../../utils/fetchData';

export const SUGGESTION_TYPES = {
    LOADING_SUGGESTION: 'LOADING_SUGGESTION',
    GET_USERS: 'GET_USERS_SUGGESTION',

}

export const getSuggestion = (token) => async(dispatch) => {
    try {
        dispatch({type: SUGGESTION_TYPES.LOADING_SUGGESTION, payload: true});

        const res = await getDataAPI('suggestionsUser', token);
        console.log(res);
        dispatch({type: SUGGESTION_TYPES.LOADING_SUGGESTION, payload: false});
    } catch(err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        dispatch({type:GLOBALTYPES.ALERT ,payload: {}});
    }
}