import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {GLOBALTYPES} from '../redux/actions/globalType';
import {createPost, updatePost} from '../redux/actions/postAction';
import Icons from './emoji';

const StatusModal = () => {
    const {auth,theme, status, socket} = useSelector(state=>state);
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
            if(file.size > 1024 * 1024 * 10){
                return err = "File largest could be 10mb";
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if(images.length === 0){
            dispatch({type: GLOBALTYPES.ALERT, payload:{error: "Please add your photo"}});
            return dispatch({type: GLOBALTYPES.ALERT, payload:{}});
        }
        if(status.onEdit){
            dispatch(updatePost({content, images, auth, status}));
        }
        else{
            dispatch(createPost({content, images, auth, socket}));
        }
        setContent('');
        setImages([]);
        if(tracks) {
            tracks.stop();
        }
        dispatch({type: GLOBALTYPES.STATUS, payload: false});
    }

    useEffect(()=>{
        if(status.onEdit){
            setContent(status.content);
            setImages(status.images);
        }
    },[status]);

    const imageShow = (src) => {
        return <img src={src}  alt="images" className="img img-responsive img-thumbnail" style={{filter: theme ? 'invert(1)':'invert(0)'}}/>
    }

    const videoShow = (src) => {
        return <video controls src={src}  alt="images" className="img img-responsive img-thumbnail" style={{filter: theme ? 'invert(1)':'invert(0)'}}/>
    }

    return (
        <div className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">Create Post</h5>
                    <div className="close-container" onClick={()=> dispatch({type: GLOBALTYPES.STATUS,payload: false}) }>
                        <div className="leftright"></div>
                        <div className="rightleft"></div>
                        <label className="close">close</label>
                    </div>
                </div>
                <div className="status_body">
                    <textarea name="content" placeholder={`${auth.user.username}, what are you thinking`} onChange={e => setContent(e.target.value)} value={content} style={{ opacity: 1, filter: theme ? 'invert(1)' : 'invert(0)', color: theme ? 'white': 'black', background: theme ?'rgb(0,0,0,0.03)' :'' }}/>
                    <div className="d-flex">
                        <div className="flex-fill"></div>
                        <Icons setContent={setContent} content={content} theme={theme}/>
                    </div>
                    <div className="input_images">
                        {
                            stream ? 
                            <i className="fas fa-camera" onClick={handleCapture}/>
                            :
                            <>
                                <i className="fas fa-camera" onClick={handleStream}/>
                                <div className="file_upload">
                                    <i className="fas fa-image"></i>
                                    <input type="file" name="file" id="file" multiple accept="image/*,video/*" onChange={handleChangeImages}/>
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
                                    {
                                        img.camera ? imageShow(img.camera)
                                                   : img.url ? <>
                                                                    {
                                                                        img.url.match(/video/i) ? videoShow(img.url) : imageShow(img.url)
                                                                    }
                                                               </>
                                                              : <>
                                                                    {
                                                                        img.type.match(/video/i) ? videoShow(URL.createObjectURL(img)) : imageShow(URL.createObjectURL(img))
                                                                    }
                                                                </>
                                    }
                                    <span onClick={() => deleteImages(ind)}>&times;</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="status_footer my-2">
                    <div>
                        <button type="submit" className="button button-2 button-2g w-100" style={{outline: 'none'}}>Posts</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default StatusModal;