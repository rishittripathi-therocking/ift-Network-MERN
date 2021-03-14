import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Loading from './Loading';
import {toast} from 'react-toastify'; 

const NotifyWarning = ({message}) => {toast.error(message); return "" }
const NotifySuccess = ({message}) => {toast.success(message); return "" }

const Alert = () => {
    const state = useSelector(state => state);
    const {auth, alert} = state;
    
    
    return (
        <div>
            {alert.loading && <Loading />}
            {alert.error && <NotifyWarning message={alert.error}/>}
            {alert.success && <NotifySuccess message={alert.success} />}
        </div>
    )
}

export default Alert;