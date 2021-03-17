import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Avatar from '../Avatar';
import {getProfileUsers} from '../../redux/actions/profileAction';
import EditProfile from './Editprofile';
import FollowButton from './FollowButton';
import Followers from './Followers';
import Following from './Following';

const Info = () => {
    const {id} = useParams();
    const {auth,profile} = useSelector(state=>state)
    const dispatch = useDispatch();

    const [userData,setUserData] = useState([]);
    const [onEdit,setOnEdit] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);

    useEffect(()=>{
        if(id === auth.user._id){
            setUserData([auth.user]);
        }
        else{
            dispatch(getProfileUsers({users:profile.users, id,auth}));
            const newData = profile.users.filter(user => user._id === id);
            setUserData(newData);
        }
    },[id,auth, dispatch, profile.users]) 

    return (
        <div className="info">
            {
                userData.map(user => (
                    <div className="info_container" key={user._id}>
                        <Avatar src={user.avatar} size="large-avatar" />
                        <div className="info_content" >
                            <div className="info_content_title">
                                <h2>{user.username}</h2>
                                {
                                    user._id === auth.user._id ? <button className="button button-3 button-3d icon-cog" style={{outline:'none'}} onClick={() => setOnEdit(true)}><i className="fa fa-cog"></i>Setting</button>: <FollowButton user={user}/>
                                }
                                
                            </div>
                            <div className="follow_btn">
                               <span className="mr-4" onClick={()=>setShowFollowers(true)}>
                                   {user.followers.length} Followers
                               </span>
                               <span className="ml-4" onClick={()=>setShowFollowing(true)}>
                                   {user.following.length} Following
                               </span>
                            </div>
                            <h6 className="userName">{user.fullname} <span style={{color: 'crimson'}} className="pl-2">{user.mobile}</span></h6>
                            <p className="m-0">{user.address}</p>
                            <h6 className="mt-1 ml-0 mb-1 mr-0">{user.email}</h6>
                            <a href={user.website} target="_blank" rel="noreferrer">
                                {user.website}
                            </a>
                            <p>{user.story}</p>
                        </div>
                        {
                            onEdit && <EditProfile setOnEdit={setOnEdit}/>
                        }
                        {
                            showFollowers && <Followers users={user.followers} setShowFollowers={setShowFollowers}/>
                        }
                        {
                            showFollowing && <Following users={user.following} setShowFollowing={setShowFollowing}/>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Info;