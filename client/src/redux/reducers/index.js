import {combineReducers} from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import theme from './themeReducer';
import profile from './profileReducer';
import status from './statusReducer';
import homePosts from './postReducer';
import modal from './modalReducer';
import discoverPosts from './postDiscoverReducer';
import suggestionUser from './suggestionReducer';
import detailPost from './detailPostReducer';
import socket from './socketReducer';
import notify from './notifyReducer';
import message from './messageReducer';
import online from './onlineReducer';
import call from './callReducer';
import peer from './peerReducer';

export default combineReducers({
    auth,
    alert,
    theme,
    profile,
    status,
    homePosts,
    modal,
    discoverPosts,
    suggestionUser,
    detailPost,
    socket,
    notify,
    message,
    online,
    call,
    peer
})