import React from 'react';
import { postDataAPI } from '../../utils/fetchData';
import CommentDisplay from './commentDisplay';

const Comments = ({post}) => {
    return (
        <div className="comments">
            {
                post.comments.map(comment => (
                    <CommentDisplay key={comment._id} comment={comment} post={post}/>
                ))
            }
        </div>
    )
}

export default Comments;