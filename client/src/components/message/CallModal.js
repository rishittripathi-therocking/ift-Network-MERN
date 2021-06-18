import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../Avatar';
import { GLOBALTYPES } from '../../redux/actions/globalType';
import { addMessage } from '../../redux/actions/messageAction';
import RingRing from '../../audio/ringring.mp3';

const CallModal = () => {
    const { call, auth, peer, socket, theme } = useSelector(state => state);
    const dispatch = useDispatch();
    const [hours, setHours] = useState(0);
    const [mins, setMins] = useState(0);
    const [second, setSecond] = useState(0);
    const [total, setTotal] = useState(0);

    const [answer, setAnswer] = useState(false);
    const youVideo = useRef();
    const otherVideo = useRef();
    const [tracks, setTracks] = useState(null);
    const [newCall, setNewCall] = useState(null);


    // End Call
    const handleEndCall = () => {
        dispatch({type: GLOBALTYPES.CALL, payload: null})
    }

    useEffect(()=> {
        if(answer) {
            setTotal(0)
        } else {
            const timer = setTimeout(() => {
                dispatch({type: GLOBALTYPES.CALL, payload: null})
            },15000)
            return () => clearTimeout(timer)
        }
        
    },[dispatch, answer])

    // Set Time
    useEffect(() => {
        const setTime = () => {
            setTotal(t => t + 1)
            setTimeout(setTime, 1000)
        }
        setTime()

        return () => setTotal(0)
    },[])

    useEffect(() => {
        setSecond(total%60)
        setMins(parseInt(total/60))
        setHours(parseInt(total/3600))
    },[total])

    // Answer Call
    const handleAnswer = () => {
        setAnswer(true)
    }

    

    return (
        <div className="call_modal">
            <div className="call_box">
                <div className="text-center" style={{padding: '40px 0'}} >
                    <Avatar src={call.avatar} size="supper-avatar" />
                    <h4>{call.username}</h4>
                    <h6>{call.fullname}</h6>
                    <div>
                        {
                            call.video ? <span>Calling video...</span> : <span>Calling Audio...</span>
                        }
                    </div>
                </div>

                <div className="timer">
                    <span>{ hours.toString().length < 2 ? '0' + hours : hours }</span>
                    <span>:</span>
                    <span>{ mins.toString().length < 2 ? '0' + mins : mins }</span>
                    <span>:</span>
                    <span>{ second.toString().length < 2 ? '0' + second : second }</span>
                </div>
                <div className="call_menu">
                    <span className="material-icons text-danger" onClick={handleEndCall}>call_end</span>
                    <React.Fragment>
                        {
                            call.video ? <span className="material-icons text-success" onClick={handleAnswer} > videocam </span> : <span className="material-icons text-success" onClick={handleAnswer}> call </span>
                        }
                    </React.Fragment>
                </div>
            </div>
        </div>
    )
}

export default CallModal