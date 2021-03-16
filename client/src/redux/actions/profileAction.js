import {GLOBALTPES} from '../actions/globalType';
import {getDataAPI, patchDataAPI} from '../../utils/fetchData';
import {imageUpload} from '../../utils/imageUpload';

export const PROFILE_TYPES = {
    LOADING: 'LOADING',
    GET_USER: 'GET_USER'
}

export const getProfileUsers = ({users,id,auth}) => async(dispatch)=> {
    
    
    if(users.every(user => user._id !== id)){
        try {
            dispatch({type: PROFILE_TYPES.LOADING, payload: true});
            const res = await getDataAPI(`user/${id}`,auth.token);
            dispatch({type: PROFILE_TYPES.GET_USER, payload: res.data});
            dispatch({type: PROFILE_TYPES.LOADING, payload: false});

        } catch(err) {
            dispatch({type: GLOBALTPES.ALERT, payload: {error: err.response.data.msg}});
        }
    }
    
}

export const updaProfileUser = ({userData, avatar,auth}) => async(dispatch) => {
    if(!userData.fullname)
        return dispatch({type: GLOBALTPES.ALERT, payload:{error: 'Please add full name'}});
    if(userData.fullname.length > 25)
        return dispatch({type: GLOBALTPES.ALERT, payload:{error: 'Full Name Too Long'}});
    if(userData.story.length> 200) {
        return dispatch({type: GLOBALTPES.ALERT, payload:{error: 'Story cant be greater than 200 characters '}});
    }
    try {
        let media;
        dispatch({type: GLOBALTPES.ALERT, payload: {loading: true}});
        if(avatar) media = await imageUpload([avatar]);
        const res= await patchDataAPI("user",{...userData, avatar: avatar ? media[0].url : auth.user.avatar}, auth.token);
        dispatch({type:GLOBALTPES.AUTH, payload: {...auth,user: {...auth.user,...userData, avatar: avatar? media[0].url: auth.user.avatar}}});
        dispatch({type: GLOBALTPES.ALERT, payload: {success: res.data.msg}})

    } catch(err) {
        dispatch({type: GLOBALTPES.ALERT, payload: {error: err.response.data.msg}});
    }

}
