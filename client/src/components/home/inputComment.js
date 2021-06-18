import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {createComment} from '../../redux/actions/commentAction';
import Icons from '../emoji';

const InputComment = ({children,post,giveReply,setGiveReply}) => {
    const [content,setContent] = useState('');
    const dispatch = useDispatch();
    const {auth, socket, theme} = useSelector(state=>state);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!content.trim()){
            if(setGiveReply) return setGiveReply(false);
            return ;
        }

        setContent('');
        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply: giveReply && giveReply.commentId,
            tag: giveReply && giveReply.user
        }
        dispatch(createComment({post,newComment,auth, socket}));
        if(setGiveReply) return setGiveReply(false);
    }

    return (
        <form className="card-footer comment_input" onSubmit={handleSubmit}>
            {children}
            <input type="text" placeholder="Add comment" value={content} onChange={e=> setContent(e.target.value)} style={{ opacity: 1, filter: theme ? 'invert(1)' : 'invert(0)', color: theme ? 'white': 'black', background: theme ?'rgb(0,0,0,0.03)' :'' }}/>
            <Icons setContent={setContent} content={content} theme={theme}/>
            <button type="submit" className="postBtn">
                Post
            </button>
        </form>
    )
}

export default InputComment;