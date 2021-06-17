import React,{ useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { POST_TYPES } from './redux/actions/postAction';
import { GLOBALTYPES } from './redux/actions/globalType';
import { NOTIFY_TYPES } from './redux/actions/notifyAction';

const SocketClient = () => {
    const {auth, socket} = useSelector(state=>state);
    const dispatch = useDispatch();

    // joinUser
    useEffect(() => {
        socket.emit('joinUser', auth.user._id)
    },[socket, auth.user._id])

    //Likes 
    useEffect(() => {
        socket.on('likeToClient', newPost => {
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })
        return () => socket.off('likeToClient');
    },[socket, dispatch])

    useEffect(() => {
        socket.on('unLikeToClient', newPost => {
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })
        return () => socket.off('unLikeToClient');
    },[socket,dispatch])

    // Comments
    useEffect(() => {
        socket.on('createCommentToClient', newPost => {
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })
        return () => socket.off('createCommentToClient');
    },[socket,dispatch])

    useEffect(() => {
        socket.on('deleteCommentToClient', newPost => {
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })
        return () => socket.off('deleteCommentToClient');
    },[socket,dispatch])

    // Follow
    useEffect(() => {
        socket.on('followToClient', newUser => {
            dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})
        })
        return () => socket.off('followToClient');
    },[socket,dispatch,auth])

    //unfollow
    useEffect(() => {
        socket.on('unfollowToClient', newUser => {
            dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})
        })
        return () => socket.off('unfollowToClient');
    },[socket,dispatch,auth])

    // Notification
    useEffect(() => {
        socket.on('createNotifyToClient', msg => {
            dispatch({type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg})
        })
        return () => socket.off('createNotifyToClient');
    },[socket,dispatch])

    useEffect(() => {
        socket.on('removeNotifyToClient', msg => {
            dispatch({type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg})
        })
        return () => socket.off('removeNotifyToClient');
    },[socket,dispatch])

    return <></>
}

export default SocketClient;