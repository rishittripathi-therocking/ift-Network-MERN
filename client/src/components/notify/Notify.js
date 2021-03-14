import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Loading from './Loading';
import {toast} from 'react-toastify'; 

const NotifyWarning = ({message}) => {toast.error(message); return "" }
const NotifySuccess = ({message}) => {toast.success(message); return "" }

const Notify = () => {
    const state = useSelector(state => state);
    const {auth, notify} = state;
    
    
    return (
        <div>
            {notify.loading && <Loading />}
            {notify.error && <NotifyWarning message={notify.error}/>}
            {notify.success && <NotifySuccess message={notify.success} />}
        </div>
    )
}

export default Notify;