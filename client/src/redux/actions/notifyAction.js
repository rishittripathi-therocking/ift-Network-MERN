import {postDataAPI, deleteDataAPI, getDataAPI} from '../../utils/fetchData';
import {GLOBALTYPES} from './globalType';

export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES'
}

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

export const getNotifies = (token) => async(dispatch) => {
    try {
        const res = await getDataAPI('notifies', token);
        console.log(res);
        dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies});
    } catch(err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
        dispatch({type: GLOBALTYPES.ALERT, payload: {}});
    }
}