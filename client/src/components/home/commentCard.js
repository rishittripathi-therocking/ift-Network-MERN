import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Comments from './Comments';

const CommentsCard = ({comment,post}) => {
    const [content,setContent] = useState('');
    const [readMore, setReadMore] = useState(false);

    useEffect(()=>{
        setContent(comment.content);
    },[comment]);

    return (
        <div className="comment_card mt-3">
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
                    <div >
                        <small className="text-muted mr-3" style={{cursor: 'pointer'}}>
                            {moment(comment.createdAt).fromNow()}
                        </small>
                        <small className="font-weight-bold mr-3" style={{cursor: 'pointer'}}>
                            {comment.likes.length} likes
                        </small>
                        <small className="font-weight-bold mr-3" style={{cursor: 'pointer'}}>
                            reply
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentsCard;