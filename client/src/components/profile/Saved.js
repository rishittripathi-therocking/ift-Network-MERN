import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {GLOBALTYPES} from '../../redux/actions/globalType';
import { getDataAPI } from '../../utils/fetchData';
import { useSelector} from 'react-redux';

const Posts = ({auth, dispatch}) => {
    const [savedPosts, setSavedPosts] = useState([]);
    const [load,setLoad]=useState(false);
    const {theme} = useSelector(state => state);
    useEffect(()=>{
        setLoad(true);
        getDataAPI('getSavePosts', auth.token)
        .then(res => {
            setSavedPosts(res.data.savePosts);
        })
        .catch(err => {
            dispatch({type: GLOBALTYPES.ALERT, payload: {eroor: err.response.data.msg}})
        })
    },[auth.token, dispatch])
    return (
        <React.Fragment>
            <div className="profile_posts" style={{paddingBottom: '40px'}}>
                {
                    savedPosts.map((post,ind)=>(
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