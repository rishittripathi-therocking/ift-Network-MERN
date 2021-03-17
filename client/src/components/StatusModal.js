import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {GLOBALTYPES} from '../redux/actions/globalType';

const StatusModal = () => {
    const {auth} = useSelector(state=>state);
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    return (
        <div className="status_modal">
            <form>
                <div className="status_header">
                    <h5 className="m-0">Create Post</h5>
                    <div className="close-container" onClick={()=> dispatch({type: GLOBALTYPES.STATUS,payload: false}) }>
                        <div className="leftright"></div>
                        <div className="rightleft"></div>
                        <label className="close">close</label>
                    </div>
                </div>
                <div className="status_body">
                    <textarea name="content" placeholder={`${auth.user.username}, what are you thinking`} onChange={e => setContent(e.target.value)}/>
                    <div className="input_images">
                        <i className="fas fa-camera"/>
                        <div className="file_upload">
                            <i className="fas fa-image"></i>
                            <input type="file" name="file" id="file" multiple accept="image/*"/>
                        </div>
                    </div>
                </div>
                <div className="status_footer my-2">
                    <div>
                        <button className="button button-2 button-2g w-100" style={{outline: 'none'}}>Posts</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default StatusModal;