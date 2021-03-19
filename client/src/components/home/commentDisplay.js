import React from 'react';
import CommentsCard from './commentCard';

const CommentDisplay = ({comment, post}) => {
    return (
        <div className="comment_dispaly">
            <CommentsCard comment={comment} post={post} key={post._id}/>
        </div>
    )
}

export default CommentDisplay;