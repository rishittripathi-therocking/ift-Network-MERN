import React from 'react';
import {useSelector} from 'react-redux';

const Avatar = ({srce}) => {
    const {theme} = useSelector(state => state);
    return (
        <img src={src} alt="" className="avatar" style={{filter:`${theme ? 'invert(1)' : 'invert(0)'} `}}/>
    )
}

export default Avatar;