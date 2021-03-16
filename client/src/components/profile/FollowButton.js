import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {follow} from '../../redux/actions/profileAction';

const ProfileButton = ({user}) => {
    const [followed, setFollowed] = useState(false);
    const {auth ,profile} = useSelector(state => state);

    const handleUnfollow = () => {
        setFollowed(false);
    }

    const handleFollow = () => {
        setFollowed(true);
        dispatch(follow({users: profile.users,user,auth}))
    }

    
    const dispatch = useDispatch();


    return (
        <div>
            {
                followed ? <button onClick={handleUnfollow} className="button button-3 button-3d icon-cog bg-danger" style={{outline:'none'}} ><i className="fas fa-heart-broken"></i>UnFollow</button>:<button onClick={handleFollow} className="button button-3 button-3d icon-cog" style={{outline:'none'}} ><i className="fa fa-heart"></i>Follow</button>
            }
            
        </div>
    )
}

export default ProfileButton;