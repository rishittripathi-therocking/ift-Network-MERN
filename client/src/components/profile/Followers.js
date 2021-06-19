import React from 'react';
import UserCard from '../usercard';
import FollowBtn from './FollowButton';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const Followers = ({users, setShowFollowers}) => {
    const {auth} = useSelector(state=>state);
    return (
        <div className="follow">
            <div className="follow_box" >
                <h4 className="text-center" style={{height: '60px', color: 'crimson',paddingTop:'3%'}}>Followers</h4>
                <hr />
                <div className="follow_content">
                    {
                        users.map((user,index) => (
                            <div key={index} className="d-flex p-2 align-items-center justify-content-between  bg-light border">
                                <Link  className="nav-link" to={`/profile/${user._id}`} onClick={()=>setShowFollowers(false)}>
                                    <UserCard user={user} border=''  setShowFollowers={setShowFollowers} />
                                </Link>
                                {auth.user._id !== user._id && <FollowBtn user={user} />}
                            </div>
                        ))
                    }
                </div>
                
                <div className="close-container" onClick={()=>setShowFollowers(false)}>
                    <div className="leftright"></div>
                    <div className="rightleft"></div>
                    <label className="close-follow">close</label>
                </div>
            </div>
        </div>
    )
}

export default Followers;