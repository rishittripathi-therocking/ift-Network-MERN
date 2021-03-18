import React from 'react';
import { useSelector } from 'react-redux';

const LikeButton = ({isLike, handleLike, handleUnlike}) => {
    const {theme} = useSelector(state=>state);
    return (
        <>
            {
                isLike ? <i className="fas fa-heart text-danger" onClick={handleUnlike} style={{filter: theme ? 'invert(1)': 'invert(0)'}}/>
                : <i className="far fa-heart" onClick={handleLike} />
            }
        </>
    )
}

export default LikeButton;