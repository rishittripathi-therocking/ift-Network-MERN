import React from 'react';
import {Link} from 'react-router-dom';

const Posts = ({theme,discoverPosts}) => {
    return (
        <React.Fragment>
            <div className="profile_posts">
                {
                    discoverPosts.posts.map((post,ind)=>(
                                post.images.map((image,index) => (
                                    <Link to={`/post/${post._id}`} key={index}>
                                        <div className="profile_posts_display" >
                                            <img src={image.url} alt="postimage" style={{filter: theme? 'invert(1)':'invert(0)'}}/>
                                            <div className="profile_posts_menu">
                                                <span>
                                                    {post.likes.length} <i className="far fa-heart"/>
                                                </span>
                                                <span>
                                                    {post.comments.length} <i className="far fa-comment"/>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                    ))
                }
            </div>
        </React.Fragment>
    )
}

export default Posts;