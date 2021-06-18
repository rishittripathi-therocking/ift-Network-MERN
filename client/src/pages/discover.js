import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllPosts} from '../redux/actions/postDiscoverAction';


const Discover = () => {
    const {discoverPosts,theme,auth} = useSelector(state=>state);
    const dispatch = useDispatch();
    useEffect(() => {
        if (auth.token) dispatch(getAllPosts(auth.token));
      },[dispatch, auth.token]);
    return (
        <React.Fragment>
            <h1 style={{paddingLeft: '40%'}}>TimeLine Post</h1>
            <div className="profile_posts">
                {
                    discoverPosts.posts.map((post,ind)=>(
                                post.images.map((image,index) => (
                                    <div className="profile_posts_display" key={index}>
                                        {
                                            image.url.match(/video/i) ? <video controls src={image.url} alt="postimage" style={{filter: theme? 'invert(1)':'invert(0)'}}/> :<img src={image.url} alt="postimage" style={{filter: theme? 'invert(1)':'invert(0)'}}/>
                                        }
                                        <div className="profile_posts_menu">
                                            <span>
                                                {post.likes.length} <i className="far fa-heart"/>
                                            </span>
                                            <span>
                                                {post.comments.length} <i className="far fa-comment"/>
                                            </span>
                                        </div>
                                    </div>
                                ))
                    ))
                }
            </div>
        </React.Fragment>
    )
}

export default Discover;