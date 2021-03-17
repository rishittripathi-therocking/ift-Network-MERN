import React from 'react';
import Avatar from './Avatar';

const UserCard = ({children,user,border}) => {
    return (
        <div className={`d-flex p-2 align-items-center justify-content-between  bg-light ${border}`}>
            <div className={`d-flex p-2 align-items-center bg-light`}>
                <Avatar src={user.avatar} size="big-avatar" />
                <div className="ml-1 " style={{transform:'translateY(-2px)'}}>
                    <span className="d-block">{user.username}</span>
                    <small style={{opacity:0.7}}>{user.fullname}</small>
                </div>
            </div>
            {children}
        </div>
    )
}

export default UserCard;