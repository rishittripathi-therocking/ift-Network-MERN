import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../usercard';
import FollowBtn from '../profile/FollowButton';
import LoadIcon from '../../images/loading.gif';
import {Link} from 'react-router-dom';

const RightSideBar = () => {
    const {auth, suggestionUser } = useSelector(state=>state);
    const dispatch = useDispatch();

    return (
        <div>
            <Link  className="nav-link" to={`/profile/${auth.user._id}`}>
                <UserCard user={auth.user} />
            </Link>
            <div className="d-flex justify-content-between align-items-center my-2">
                <h5 className="text-danger">Suggestions for you</h5>
                <i className="fas fa-redo"/>
            </div>
            {
                suggestionUser.loading
                    ?<img src={LoadIcon} alt="Loading" className="d-block mx-auto my-4" />
                    :<div>
                        {
                            suggestionUser.users.map((user,ind) => (
                                <div key={ind} style={{paddingBottom: (ind===suggestionUser.users.length-1)?'35px':''}} className="d-flex mr-4">
                                    <Link  className="nav-link align-items-center justify-content-between" to={`/profile/${user._id}`} >
                                        <UserCard user={user} border='' />
                                    </Link>
                                    <FollowBtn user={user} />
                                </div>
                            ))
                        }
                    </div>

            }
        </div>
    )
}

export default RightSideBar;