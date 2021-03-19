import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import {Link} from 'react-router-dom';
import moment from 'moment';
import CommentMenu from './CommentMenu';
import LikeButton from '../LikeButton';
import { useSelector } from 'react-redux';

const CommentsCard = ({comment,post}) => {
    const [content,setContent] = useState('');
    const [readMore, setReadMore] = useState(false);
    const {auth} = useSelector(state=>state);
    const [isLike, setIsLike] = useState(false);

    useEffect(()=>{
        setContent(comment.content);
    },[comment]);

    const styleCard = {
        opacity: comment._id ? 1 :0.5 ,
        pointerEvents: comment._id ? 'inherit':'none'
    }

    const handleLike = async() => {
        setIsLike(true);
    }

    const handleUnlike = async() => {
        setIsLike(false);
    }

    return (
        <div className="comment_card " style={styleCard}>
            <Link to={`profile/${comment.user._id}`} className="d-flex text-dark">
                <Avatar src={comment.user.avatar} size="small-avatar" />
                <h6 className="mx-1">{comment.user.username}</h6>
            </Link>
            <div className="comment_content">
                <div className="flex-fill">
                    <div>
                        <span>
                            {
                                content.length < 100 ?content:
                                readMore ? content + '' : content.slice(0,100) + '...'
                            }
                        </span>
                        {
                            content.length > 100 &&
                            <span className="readMore" onClick={()=>setReadMore(!readMore)}>
                                {readMore? 'Hide Comment' : 'Read Comment'}
                            </span>
                        }
                    </div>
                    <div style={{cursor: 'pointer'}}>
                        <small className="text-muted mr-3" >
                            {moment(comment.createdAt).fromNow()}
                        </small>
                        <small className="font-weight-bold mr-3" >
                            {comment.likes.length} likes
                        </small>
                        <small className="font-weight-bold mr-3">
                            reply
                        </small>
                    </div>
                </div>
                <div className="d-flex align-items-center mx-1">
                    <CommentMenu post={post} comment={comment} auth={auth}/>
                    <LikeButton style={{cursor: 'pointer'}} isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike}/>
                </div>
            </div>
        </div>
    )
}

export default CommentsCard;