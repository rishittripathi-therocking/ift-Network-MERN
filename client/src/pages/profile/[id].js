import React from 'react';
import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';

const Profile = () => {
    return (
        <div className="profile">
            <Info />
            <Posts />
        </div>
    )
}

export default Profile;