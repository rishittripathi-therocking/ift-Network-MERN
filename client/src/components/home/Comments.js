import React, { useEffect, useState } from 'react';
import CommentDisplay from './commentDisplay';

const Comments = ({post}) => {
    const [viewComment,setViewComment] = useState(false);
    const [replyComment,setReplyComments] = useState([]);

    useEffect(()=>{
        const newRep = post.comments.filter(cm => cm.reply)
        setReplyComments(newRep);
    },[post.comments])
    return (
        <>
            <h6 onClick={()=> setViewComment(!viewComment)} style={{color:'crimson', paddingLeft:'23px', cursor:'pointer'}}>
                {
                    viewComment ? 'Hide All Comments ' : `View all ${post.comments.length} Comments ... `
                }
            </h6>
            {
                viewComment ? post.comments.length > 0 ? 
                <div className="comments">
                    {   
                        post.comments.filter(cm=>!cm.reply).map((comment,ind) => (
                            <CommentDisplay key={ind} comment={comment} post={post} replyComment={replyComment.filter(iem=>iem.reply===comment._id)}/>
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