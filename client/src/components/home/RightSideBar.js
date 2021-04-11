import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../usercard';
import ProfileButton from '../profile/FollowButton';
import {Link} from 'react-router-dom';

const RightSideBar = () => {
    const {auth, suggestionUser } = useSelector(state=>state);
    const dispatch = useDispatch();
    
    return (
        <div>
            <Link  className="nav-link" to={`/profile/${auth.user._id}`}>
                <UserCard user={auth.user} />
            </Link>
            <div className="d-flex justify-content-between align-items-center my-2">
                <h5 className="text-danger">Suggestions for you</h5>
                <i className="fas fa-redo"/>
            </div>
        </div>
    )
}

export default RightSideBar;