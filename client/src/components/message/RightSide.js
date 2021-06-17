import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserCard from '../usercard';
import MsgDisplay from './MsgDisplay';

const RightSide = () => {
    const {auth,message,theme} = useSelector(state => state);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const newUser = message.users.find(user => user._id === id)
        if(newUser) {
            setUser(newUser)
        }
    },[message.users, id])

    return (
        <React.Fragment>
            <div className="message_header" style={{cursor: 'pointer'}} >
                {
                    user.length !== 0 &&
                    <UserCard user={user}>
                        <div>
                            <i className="fas fa-phone-alt"
                                // onClick={handleAudioCall} 
                            />

                            <i className="fas fa-video mx-3"
                                // onClick={handleVideoCall} 
                            />

                            <i className="fas fa-trash text-danger"
                                // onClick={handleDeleteConversation} 
                            />
                        </div>
                    </UserCard>
                }
            </div>
            <div className="chat_container">
                <div className="chat_display">
                    <div className="chat_row other_message">
                        <MsgDisplay user={user}/>
                    </div>
                    <div className="chat_row you_message">
                        <MsgDisplay user={auth.user}/>
                    </div>
                </div>
            </div>
            <form className="chat_input" >
                <input type="text" placeholder="Enter you message..."
                    value={text} onChange={e => setText(e.target.value)}
                    style={{
                        filter: theme ? 'invert(1)' : 'invert(0)',
                        background: theme ? '#040404' : '',
                        color: theme ? 'white' : ''
                    }} />

                <button type="submit" className="material-icons" 
                    disabled={text ? false : true}>
                    near_me
                </button>
            </form>
        </React.Fragment>
    )
}

export default RightSide;