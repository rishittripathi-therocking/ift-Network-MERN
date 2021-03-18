import React from 'react';
import {Link} from 'react-router-dom';
import Send from '../../images/send.svg';

const CardFooter = ({post}) => {
    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <i className="far fa-heart"/>
                    <Link to={`/post/${post._id}`} className="text-dark">
                        <i className="far fa-comment"/>
                    </Link>
                    <img src={Send} alt="send" />
                </div>
                <i className="far fa-bookmark"/>
            </div>
            <div className="row justify-content-between mx-0">
                <h6 style={{padding: '0 25px', cursor:'pointer'}}>
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