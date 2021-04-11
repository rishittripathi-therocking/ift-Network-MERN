import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import {getPost} from '../../redux/actions/postAction';
import  LoadIcon from '../../images/loading.gif';
import CardBody from '../../components/home/CardBody';
import CardFooter from '../../components/home/CardFooter';
import CardHeader from '../../components/home/CardHeader';
import Comments from '../../components/home/Comments';
import InputComment from '../../components/home/inputComment';

const Post = () => {
    const {id} = useParams();
    const [postEv, setPost] = useState([]);
    const {auth, detailPost} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPost({detailPost, id, auth}));
        if(detailPost.length> 0 ){
            const newArr = detailPost.filter(post => post._id === id)
            setPost(newArr)
        }
    },[dispatch, detailPost, auth,id])
    return (
        <div>
            {
                postEv.length === 0 && <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4"/>
            }
            <div className="posts">
            {
                postEv.map((post,ind)=>(
                    <div className="card my-3" key={ind} >
                        <CardHeader post={post}/>
                        <CardBody post={post}/>
                        <CardFooter post={post}/>

                        <Comments post={post} />
                        <InputComment post={post}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Post;