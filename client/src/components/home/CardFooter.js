import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Send from '../../images/send.svg';
import LikeButton from '../LikeButton';

const CardFooter = ({post}) => {
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);

    const handleLike = () => {
        setIsLike(true);
    }

    const handleUnlike = () => {
        setIsLike(false);
    }

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike}/>
                    <Link to={`/post/${post._id}`} className="text-dark">
                        <i className="far fa-comment"/>
                    </Link>
                    <img src={Send} alt="send" />
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
        </div>
    )
}

export default CardFooter;