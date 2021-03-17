import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {GLOBALTYPES} from '../redux/actions/globalType';

const StatusModal = () => {
    const {auth,theme} = useSelector(state=>state);
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);

    const handleChangeImages = (e) => {
        const files = [...e.target.files];
        let err = "";
        let newImages = []

        files.forEach(file => {
            if(!file) return err = "File does not Exits";
            if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
                return err = "File format different then jpeg/png";
            }
            return newImages.push(file);
        })
        if(err) {
            dispatch({type: GLOBALTYPES.ALERT,payload: {error: err}})
        }
        setImages([...images, ...newImages]);
    }

    const deleteImages = (index) => {
        const newArr = [...images];
        newArr.splice(index,1);
        setImages(newArr);
    }

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
                            <input type="file" name="file" id="file" multiple accept="image/*" onChange={handleChangeImages}/>
                        </div>
                    </div>
                    <div className="show_images">
                        {
                            images.map((img,ind) => (
                                <div key={ind} id="file_img">
                                    <img src={URL.createObjectURL(img)} alt="images" className="img img-responsive img-thumbnail" style={{filter: theme ? 'invert(1)':'invert(0)'}}/>
                                    <span onClick={() => deleteImages(ind)}>&times;</span>
                                </div>
                            ))
                        }
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