import React from 'react';
import { useSelector } from 'react-redux';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';

const Posts = () => {
    const {homePosts} = useSelector(state => state);
    return (
        <div className="posts">
            {
                homePosts.posts.map((post,ind)=>(
                    <div className="card my-3" key={ind} style={{bottom: (ind===homePosts.posts.length-1)?'50px':''}}>
                        <CardHeader post={post}/>
                        <CardBody post={post}/>
                        <CardFooter post={post}/>
                    </div>
                ))
            }
        </div>
    )
}

export default Posts;