import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {follow, unfollow} from '../../redux/actions/profileAction';

const ProfileButton = ({user,buttonType}) => {
    const [followed, setFollowed] = useState(false);
    const {auth ,profile} = useSelector(state => state);
    const dispatch = useDispatch();

    const handleUnfollow = () => {
        setFollowed(false);
        dispatch(unfollow({users: profile.users,user,auth}))
    }

    const handleFollow = () => {
        setFollowed(true);
        dispatch(follow({users: profile.users,user,auth}));
    }

    useEffect(()=>{
        if(auth.user.following.find(item => item._id === user._id)){
            setFollowed(true);
        }
    },[auth.user.following,user._id])


    return (
        <div>
            {
                buttonType==="small"?
                    followed ? <button onClick={handleUnfollow} className="btn btn-outline btn-outline-danger">UnFollow</button>:<button onClick={handleFollow} className="btn btn-outline btn-outline-primary" >Follow</button>
                :
                followed ? <button onClick={handleUnfollow} className="button button-3 button-3d icon-cog bg-danger" style={{outline:'none'}} ><i className="fas fa-heart-broken"></i>UnFollow</button>:<button onClick={handleFollow} className="button button-3 button-3d icon-cog" style={{outline:'none'}} ><i className="fa fa-heart"></i>Follow</button>
            }
            
        </div>
    )
}

export default ProfileButton;