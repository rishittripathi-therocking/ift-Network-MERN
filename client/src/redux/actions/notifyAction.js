import {postDataAPI, deleteDataAPI} from '../../utils/fetchData';
import {GLOBALTYPES} from './globalType';

export const createNotify = ({msg, auth, socket}) => async(dispatch) => {
    try {
        const res = await postDataAPI('notify', msg, auth.token);
    } catch(err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        dispatch({type: GLOBALTYPES.ALERT, payload: {}});
    }
}

export const removeNotify = ({msg, auth, socket}) => async(dispatch) => {
    try {
        const res = await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token);
        //console.log(res);
    } catch(err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        dispatch({type: GLOBALTYPES.ALERT, payload: {}});
    }
}