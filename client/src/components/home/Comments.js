import React, { useState } from 'react';
import CommentDisplay from './commentDisplay';

const Comments = ({post}) => {
    const [viewComment,setViewComment] = useState(false);
    return (
        <>
            <h6 onClick={()=> setViewComment(!viewComment)} style={{color:'crimson', paddingLeft:'23px', cursor:'pointer'}}>
                {
                    viewComment ? 'Hide All Comments ' : 'View Comments ... '
                }
            </h6>
            {
                viewComment ? post.comments.length > 0 ? 
                <div className="comments">
                    {   
                        post.comments.map((comment,ind) => (
                            <CommentDisplay key={ind} comment={comment} post={post}/>
                        ))
                    }
                </div>:
                <small style={{color:'crimson', paddingLeft:'23px',marginBottom: '5px'}}>
                    No Comments Yet
                </small>
                :''
            }
            
            
        </>
    )
}

export default Comments;