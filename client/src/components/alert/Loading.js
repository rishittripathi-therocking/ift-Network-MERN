import React from 'react';
import {WindMillLoading} from 'react-loadingg';

const Loading = () => {
    return (
        <div className="position-fixed w-100 h-100 text-center loading" style={{background:"#0008",top:0,left:0, zIndex:50}}>
            <WindMillLoading size="large" />
        </div>
    )
}

export default Loading;