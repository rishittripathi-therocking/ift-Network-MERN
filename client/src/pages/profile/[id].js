import React from 'react';
import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';
import {useSelector} from 'react-redux';
import LoadIcon from '../../images/loading.gif';

const Profile = () => {
    const {profile} = useSelector(state => state);
    return (
        <div className="profile">
            {profile.loading ? <img src={LoadIcon} alt="loading"/> :<Info />}
            <Posts />
        </div>
    )
}

export default Profile;