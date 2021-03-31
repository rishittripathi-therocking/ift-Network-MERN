import React, {useState} from 'react';
import CommentsCard from './commentCard';

const CommentDisplay = ({comment, post,replyComment}) => {
    const [viewComment,setViewComment] = useState(false);
    return (
        <div className="comment_display">
            <CommentsCard comment={comment} post={post} key={post._id} commentId={comment._id} >
                <h6 className="pt-2" onClick={()=> setViewComment(!viewComment)} style={{color:'crimson', paddingLeft:'23px', cursor:'pointer'}}>
                    {
                        viewComment ? 'Hide All Reply Comments ' : `View all ${replyComment.length} Reply Comments ... `
                    }
                </h6>
                {

                    viewComment &&
                    <div className="pl-4 pt-2">
                        {
                            replyComment.map((item,ind)=>(
                                item.reply && 
                                <CommentsCard key={ind} comment={item} post={post} commentId={comment._id} />
                            ))
                        }
                    </div>
                }
            </CommentsCard>
        </div>
    )
}

export default CommentDisplay;