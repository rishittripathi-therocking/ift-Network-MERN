import React from 'react';
import Avatar from './Avatar';

const UserCard = ({user,border}) => {
    return (
        <div className={`d-flex p-2 align-item-center bg-light ${border}`}>
            <Avatar src={user.avatar} size="big-avatar" />
            <div className="ml-1" style={{transform:'translateY(-2px)'}}>
                <span className="d-block">{user.username}</span>
                <small style={{opacity:0.7}}>{user.fullname}</small>
            </div>
        </div>
    )
}

export default UserCard;