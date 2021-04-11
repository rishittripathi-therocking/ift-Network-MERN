import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../usercard';
import FollowBtn from '../profile/FollowButton';
import LoadIcon from '../../images/loading.gif';
import {Link} from 'react-router-dom';
import {getSuggestion} from '../../redux/actions/suggestionAction';

const RightSideBar = () => {
    const {auth, suggestionUser } = useSelector(state=>state);
    const dispatch = useDispatch();

    return (
        <div className="my-4">
            <Link  className="nav-link" to={`/profile/${auth.user._id}`}>
                <UserCard user={auth.user} />
            </Link>
            <div className="d-flex justify-content-between align-items-center my-2">
                <h5 className="text-danger">Suggestions for you</h5>
                {
                    !suggestionUser.loading && <i className="fas fa-redo" style={{cursor: 'pointer'}} onClick={()=>dispatch(getSuggestion(auth.token))}/>
                }
                
            </div>
            {
                suggestionUser.loading
                    ?<img src={LoadIcon} alt="Loading" className="d-block mx-auto my-4" />
                    :<div>
                        {
                            suggestionUser.users.map((user,ind) => (
                                <div key={ind}  className="d-flex align-items-center justify-content-between bg-light border pr-3">
                                    <Link  className="nav-link " to={`/profile/${user._id}`} >
                                        <UserCard user={user} border='' />
                                    </Link>
                                    <FollowBtn user={user} buttonType="small"/>
                                </div>
                            ))
                        }
                    </div>

            }
            <div style={{paddingBottom:'35px'}} style={{opacity: 0.5}} className="my-2">
                <a href="https://www.youtube.com/channel/UCH-XIJiUKH6pD8noP06VT6Q" target="_blank" rel="noreferror">
                https://www.youtube.com/channel/UCH-XIJiUKH6pD8noP06VT6Q
                </a>
                <small className="d-block">
                    Welcome to my Channel "Programming Snippets"
                </small>
                <small>
                    &copy; 2021 IFT-NETWORK FROM Rishit/Programming Snippets
                </small>

            </div>
        </div>
    )
}

export default RightSideBar;