import {postDataAPI} from '../../utils/fetchData';
import {GLOBALTPES} from './globalType';


export const login = (data) => async (dispatch) => {
    try {
        dispatch({type:GLOBALTPES.ALERT ,payload: {loading: true}});
        const res = await postDataAPI('login',data);
        dispatch({type:GLOBALTPES.AUTH ,payload: {token:res.data.access_token, user:res.data.user}});
        localStorage.setItem("firstLogin",true)
        dispatch({type:GLOBALTPES.ALERT ,payload: {success:res.data.msg}});
    } catch(err) {
        dispatch({type:GLOBALTPES.ALERT ,payload: {error: err.response.data.msg}});
    }
}
export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem('firstLogin');
    if(firstLogin){
        dispatch({type: GLOBALTPES.ALERT ,payload: {loading:true}});
        try{
            const res = await postDataAPI('refresh_token');
            dispatch({type:GLOBALTPES.AUTH ,payload: {token:res.data.access_token, user:res.data.user}});
            dispatch({type: GLOBALTPES.ALERT ,payload: {}});
        } catch(err) {
            dispatch({type:GLOBALTPES.ALERT ,payload: {error: err.response.data.msg}});
        }
    }
}
