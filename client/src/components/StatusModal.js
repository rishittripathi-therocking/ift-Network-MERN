import e from 'express';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {GLOBALTYPES} from '../redux/actions/globalType';

const StatusModal = () => {
    const {auth,theme} = useSelector(state=>state);
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [stream, setStream]= useState(false);
    const videoRefrence = useRef();
    const canvasRefrence = useRef();
    const [tracks, setTracks] = useState('');

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

    const handleStream = ()=> {
        setStream(true);
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia({video: true})
            .then(mediaStream => {
                videoRefrence.current.srcObject = mediaStream;
                videoRefrence.current.play();
                const track = mediaStream.getTracks();
                setTracks(track[0])
            }).catch(err => console.log(err))
        }
    }

    const handleCapture = () => {
        const width = videoRefrence.current.clientWidth;
        const height = videoRefrence.current.clientHeight;

        canvasRefrence.current.setAttribute("width", width);
        canvasRefrence.current.setAttribute("height", height);
        const ctx = canvasRefrence.current.getContext('2d');
        ctx.drawImage(videoRefrence.current, 0, 0, width, height);
        let URL = canvasRefrence.current.toDataURL();
        setImages([...images, {camera: URL}])
    }

    const handleStopCameraStream = () => {
        tracks.stop()
        setStream(false);
    }
    return (
        <div className="status_modal">
            <form >
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
                        {
                            stream ? 
                            <i className="fas fa-camera" onClick={handleCapture}/>
                            :
                            <>
                                <i className="fas fa-camera" onClick={handleStream}/>
                                <div className="file_upload">
                                    <i className="fas fa-image"></i>
                                    <input type="file" name="file" id="file" multiple accept="image/*" onChange={handleChangeImages}/>
                                </div>
                            </>
                        }
                        
                    </div>

                    {
                        stream && <div className="stream position-relative">
                            <video autoPlay muted style={{filter: theme ? 'invert(1)':'invert(0)'}} ref={videoRefrence} width="100%" height="100%" />
                            <span onClick={handleStopCameraStream}>&times;</span>
                            <canvas ref={canvasRefrence} style={{display: 'none'}}/>
                        </div>
                    }

                    <div className="show_images">
                        {
                            images.map((img,ind) => (
                                <div key={ind} id="file_img">
                                    <img src={img.camera ? img.camera : URL.createObjectURL(img)}  alt="images" className="img img-responsive img-thumbnail" style={{filter: theme ? 'invert(1)':'invert(0)'}}/>
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