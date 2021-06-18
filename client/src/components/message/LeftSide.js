import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalType'
import { useHistory, useParams } from 'react-router-dom'
import UserCard from '../usercard';
import {  MESS_TYPES, getConversations } from '../../redux/actions/messageAction'


const LeftSide = () => {

    const [search, setSearch] = useState('');
    const {auth, message} =useSelector(state=>state);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [searchUsers, setSearchUsers] = useState([]);
    const pageEnd = useRef();
    const [page, setPage] = useState(0);

    const handleSearch = async e => {
        e.preventDefault()
        if(!search) return setSearchUsers([]);

        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setSearchUsers(res.data.users)
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
            })
        }
    }

    const handleAddUser = (user) => {
        setSearch('')
        setSearchUsers([])
        dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text: '', media: []}})
        //dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
        return history.push(`/message/${user._id}`)
    }

    const isActive = (user) => {
        if(id === user._id) return 'active';
        return ''
    }

    useEffect(() => {
        if(message.firstLoad) return;
        dispatch(getConversations({auth}))
    },[dispatch, auth, message.firstLoad])

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setPage(p => p + 1)
            }
        },{
            threshold: 0.1
        })

        observer.observe(pageEnd.current)
    },[setPage])

    useEffect(() => {
        if(message.resultUsers > (page-1)*9 && page > 1){
            dispatch(getConversations({auth,page}))
        }
    },[message.resultUsers, page, id, auth, dispatch])

    return (
        <React.Fragment>
            <form className="message_header"  onSubmit={handleSearch}>
                <input type="text" value={search}
                    placeholder="Enter to Search..."
                    onChange={e => setSearch(e.target.value)} />

                <button type="submit" style={{display: 'none'}}>Search</button>
            </form>
            <div className="message_chat_list">
                {
                    searchUsers.length !== 0
                    ?  <>
                        {
                            searchUsers.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`} onClick={() => handleAddUser(user)}>
                                    <UserCard user={user} />
                                </div>
                            ))
                        }
                        
                    </>
                    : <>
                        {
                            message.users.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}>
                                    <UserCard user={user} msg={true}>
                                        <i className="fas fa-circle text-success" />
                                    </UserCard>
                                </div>
                            ))
                        }
                    </>
                }
                <button ref={pageEnd} style={{opacity: 0}}>Load More</button>    
            </div>
        </React.Fragment>
    )
}

export default LeftSide;