import React from 'react';
import Avatar from './Avatar';

const UserCard = ({user,border,children, msg}) => {
    return (
        
            <div className={`d-flex p-2 align-items-center ${border}`}>
                <Avatar src={user.avatar} size="big-avatar" />
                <div className="ml-1 mr-3" style={{transform:'translateY(-2px)'}}>
                    <span className="d-block">{user.username}</span>
                    <small style={{opacity:0.7}}>
                        {
                            msg
                            ? <><div>{user.text}</div>{user.media.length > 0 && <div>{user.media.length} <i className="fas fa-image"></i></div>}</>
                            : user.fullname
                        }
                    </small>
                </div>
                {
                    children
                }
            </div>
    )
}

export default UserCard;