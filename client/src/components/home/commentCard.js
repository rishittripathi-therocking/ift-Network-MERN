import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import {Link} from 'react-router-dom';
import moment from 'moment';
import CommentMenu from './CommentMenu';
import LikeButton from '../LikeButton';
import { useDispatch, useSelector } from 'react-redux';
import {updateCommment, likeComment, unlikeComment, deleteComment} from '../../redux/actions/commentAction';
import InputComment from './inputComment';

const CommentsCard = ({children,comment,post, commentId}) => {
    const [content,setContent] = useState('');
    const [readMore, setReadMore] = useState(false);
    const {auth} = useSelector(state=>state);
    const [isLike, setIsLike] = useState(false);
    const [onEdit,setOnEdit] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const [giveReply, setGiveReply] = useState(false);
    const dispatch = useDispatch(); 

    useEffect(()=>{
        setContent(comment.content);
        if(comment.likes.find(like=>like._id === auth.user._id)){
            setIsLike(true);
        }
    },[comment,auth.user._id]);

    const styleCard = {
        opacity: comment._id ? 1 :0.5 ,
        pointerEvents: comment._id ? 'inherit':'none'
    }

    const handleDelete = () => {
        if(post.user._id === auth.user._id || comment.user._id === auth.user._id){
            dispatch(deleteComment({post,comment,auth}))
        }
    }

    const handleLike = async() => {
        if(loadLike) return;
        setIsLike(true);
        setLoadLike(true);
        dispatch(likeComment({comment,post,auth}));
        setLoadLike(false);
    }

    const handleUnlike = async() => {
        if(loadLike) return;
        setIsLike(false);
        setLoadLike(true);
        dispatch(unlikeComment({comment,post,auth}));
        setLoadLike(false);
    }

    const handleUpdate = () => {
        if(comment.content !== content){
            dispatch(updateCommment({comment,post,content,auth}));
            setOnEdit(false);
        } else {
            setOnEdit(false);
        }
    }

    const handleReply = () => {
        if(giveReply){
            return setGiveReply(false);
        }
        setGiveReply({...comment,commentId});

    }

    return (
        <div className="comment_card " style={styleCard}>
            <Link to={`profile/${comment.user._id}`} className="d-flex text-dark">
                <Avatar src={comment.user.avatar} size="small-avatar" />
                <h6 className="mx-1">{comment.user.username}</h6>
            </Link>
            <div className="comment_content">
                <div className="flex-fill">
                    {
                        onEdit ? <textarea name="" id="" cols="" rows="5" value={content} onChange={e=>setContent(e.target.value)}/>:
                        <div>
                            {
                                comment.tag && comment.tag._id !== comment.user._id && 
                                <Link to={`profile/${comment.tag._id}`} className="mr-1">
                                    @{comment.tag.username}
                                </Link>
                            }
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
                    }
                    
                    <div style={{cursor: 'pointer'}}>
                        <small className="text-muted mr-3" >
                            {moment(comment.createdAt).fromNow()}
                        </small>
                        <small className="font-weight-bold mr-3" >
                            {comment.likes.length} likes
                        </small>
                        {
                            onEdit ?
                            <>
                                <small className="font-weight-bold mr-3" onClick={handleUpdate}>
                                    Update
                                </small>
                                <small className="font-weight-bold mr-3" onClick={()=>setOnEdit(false)}>
                                    Cancel
                                </small>
                            </>
    
                            :
                            <small className="font-weight-bold mr-3" onClick={handleReply}>
                                {giveReply ? 'cancle' : 'reply'}
                            </small>
                        }
                        
                    </div>
                </div>
                <div className="d-flex align-items-center mx-1">
                    <CommentMenu post={post} comment={comment} auth={auth} setOnEdit={setOnEdit} handleDelete={handleDelete}/>
                    <span style={{cursor: 'pointer'}}>
                        <LikeButton  isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike}/>
                    </span>
                </div>
            </div>
            {
                giveReply && 
                <InputComment post={post} giveReply={giveReply} setGiveReply={setGiveReply}>
                    <Link to={`/profile/${giveReply.user._id}`} className="mr-1">
                        @{giveReply.user.username}:
                    </Link>
                </InputComment>

            }
            {children}
        </div>
    )
}

export default CommentsCard;