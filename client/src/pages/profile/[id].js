import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';
import Saved from '../../components/profile/Saved';
import {useSelector, useDispatch} from 'react-redux';
import LoadIcon from '../../images/loading.gif';
import {getUserPosts} from '../../redux/actions/postDiscoverAction';

const Profile = () => {
    const {profile} = useSelector(state => state);
    const {id} = useParams();
    const {auth,discoverPosts,theme} = useSelector(state=>state);
    const dispatch = useDispatch();
    useEffect(()=>{
        if (auth.token) 
            dispatch(getUserPosts(auth.token,id));
    },[dispatch,auth.token, id]);
    const [saveTab, setSaveTab] = useState(false);
    return (
        <div className="profile">
            
            {profile.loading ? <img className={'d-block mx-auto my-4'} src={LoadIcon} alt="loading"/> :<Info />}
            {
                auth.user._id === id && 
                <div className="profile_tab">
                    <button className={saveTab ?'' : 'active'} onClick={()=> setSaveTab(false)}>Posts</button>
                    <button className={saveTab ?'active' : ''} onClick={()=> setSaveTab(true)}>Saved</button>
                </div>
            }
            {
                <>
                    {
                        saveTab ?
                            <Saved auth={auth} dispatch={dispatch} />
                        : <Posts theme={theme} discoverPosts={discoverPosts}/>
                    }
                </>
            }
            
        </div>
    )
}

export default Profile;