import React from 'react';
import Avatar from './Avatar';

const UserCard = ({user,border,children}) => {
    return (
        
            <div className={`d-flex p-2 align-items-center bg-light ${border}`}>
                <Avatar src={user.avatar} size="big-avatar" />
                <div className="ml-1 mr-3" style={{transform:'translateY(-2px)'}}>
                    <span className="d-block">{user.username}</span>
                    <small style={{opacity:0.7}}>{user.fullname}</small>
                </div>
                {
                    children
                }
            </div>
    )
}

export default UserCard;