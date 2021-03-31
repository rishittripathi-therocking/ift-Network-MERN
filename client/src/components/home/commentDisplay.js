import React from 'react';
import CommentsCard from './commentCard';

const CommentDisplay = ({comment, post,replyComment}) => {
     
    return (
        <div className="comment_display">
            <CommentsCard comment={comment} post={post} key={post._id} commentId={comment._id} >
                <div className="pl-4">
                    {
                        replyComment.map((item,ind)=>(
                            item.reply && 
                            <CommentsCard key={ind} comment={item} post={post} commentId={comment._id} />
                        ))
                    }
                </div>
            </CommentsCard>
        </div>
    )
}

export default CommentDisplay;