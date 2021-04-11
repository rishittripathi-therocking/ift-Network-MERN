import React from 'react';
import { useSelector } from 'react-redux';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import Comments from './Comments';
import InputComment from './inputComment';

const Posts = () => {
    const {homePosts} = useSelector(state => state);
    return (
        <div className="posts">
            {
                homePosts.posts.map((post,ind)=>(
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
    )
}

export default Posts;