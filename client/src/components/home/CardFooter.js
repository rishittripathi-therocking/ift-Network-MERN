import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import Send from '../../images/send.svg';
import ShareModal from './ShareModal';
import LikeButton from '../LikeButton';
import {BASE_URL} from '../../utils/config';
import {likePost, unlikePost} from '../../redux/actions/postAction';

const CardFooter = ({post}) => {
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const {auth, theme} = useSelector(state=>state);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(post.likes.length>0){
            if(post.likes.find(like=>like._id === auth.user._id)){
                setIsLike(true);
            }
        }
        else{
            setIsLike(false)
        }
    },[post.likes,auth.user._id])

    const handleLike = async() => {
        if(loadLike) return;
        setIsLike(true);
        setLoadLike(true);
        await dispatch(likePost({ post, auth }));
        setLoadLike(false);
    }

    const handleUnlike = async() => {
        if(loadLike) return;
        setIsLike(false);
        setLoadLike(true);
        await dispatch(unlikePost({ post, auth }));
        setLoadLike(false);
    }
    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike}/>
                    <Link to={`/post/${post._id}`} className="text-dark">
                        <i className="far fa-comment"/>
                    </Link>
                    <img src={Send} alt="send" onClick={()=>setIsShare(!isShare)}/>
                </div>
                <i className="far fa-bookmark"/>
            </div>
            <div className="row justify-content-between mx-0">
                <h6 style={{padding: '0 20px', cursor:'pointer'}}>
                    {post.likes.length} likes
                 </h6>
                <h6 style={{padding: '0 25px', cursor:'pointer'}}>
                    {post.comments.length} comments
                </h6>
            </div>
            {
                isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme}/>
            }
        </div>
    )
}

export default CardFooter;