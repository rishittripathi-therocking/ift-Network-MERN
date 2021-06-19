import React from 'react';
import Avatar from './Avatar';

const UserCard = ({user,border,children, msg}) => {

    const showMessage = (user) => {
        return(
            <>
                <div>{user.text}</div>{user.media.length > 0 && <div>{user.media.length} <i className="fas fa-image"></i></div>} 
                {
                    user.call && 
                    <span className="material-icons">  
                        {
                            user.call.times === 0
                            ? user.call.video ? 'videocam_off' : 'phone_disabled'
                            : user.call.video ? 'video_camera_front' : 'call'
                        }
                    </span>
                }
            </>
        )
    }
    return (
        
            <div className={`d-flex p-2 align-items-center ${border}`}>
                <Avatar src={user.avatar} size="big-avatar" />
                <div className="ml-1 mr-3" style={{transform:'translateY(-2px)'}}>
                    <span className="d-block">{user.username}</span>
                    <small style={{opacity:0.7}}>
                        {
                            msg
                            ? showMessage(user)
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