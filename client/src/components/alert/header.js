import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'; 
import {logout} from '../../redux/actions/authAction';
import logo from '../../images/icon-web-01.png';
import {GLOBALTPES} from '../../redux/actions/globalType';
import Avatar from '../Avatar';
import {getDataAPI} from '../../utils/fetchData';
import UserCard from '../usercard'; 


const Header = () => {
    const navLinks=[
        {label: 'Home', icon: 'home', path:'/'},
        {label: 'Message', icon: 'near_me', path:'/message'},
        {label: 'Discover', icon: 'explore', path:'/discover'},
        {label: 'Notify', icon: 'favorite', path:'/notify'}
    ];

    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    

    const {auth, theme} = useSelector(state => state);
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const isActive = (pn) => {
        if(pn === pathname) return 'active';
    }

    

    const handleChange = async(e) => {
        setSearch(e.target.value.toLowerCase().replace(/ /g,''));
        if(!search) return;
        try {
            const res = await getDataAPI(`search?username=${search}`,auth.token);
            setUsers(res.data.users);
        }
        catch(err) {
            dispatch({type: GLOBALTPES.ALERT, payload:{error: err.response.data.msg}})
        }
    }

    /*const handleSearch = async(e) => {
        e.preventDefault();
        if(!search) return;
        try {
            const res = await getDataAPI(`search?username=${search}`,auth.token);
            setUsers(res.data.users)
        } catch(err) {
            dispatch({type: GLOBALTPES.ALERT, payload:{error: err.response.data.msg}})
        }
    }*/

    const handleClose = () => {
        setSearch('');
        setUsers([]);
    }

    return (
        <div className='header bg-dark'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between align-middle">
                <Link className="navbar-brand" to='/'>
                    <img src={logo} width="30" height="30" className="d-inline-block align-top p-1" alt="" />
                    IFT-NETWORK
                </Link>
                
                <form className="form-inline" >
                    <div className="input-group " >
                        <div className="input-group-prepend">
                            <div className="input-group-text"><i className="fa fa-search" /></div>
                        </div>
                        <input className="form-control mr-sm-2" aria-label="Search" onChange={handleChange} id="search" type="search" placeholder="Search" value={search}/>
                    </div>
                    
                </form>
                
                <div className="users">
                        {
                            search && users.map((user,index) => (
                                <Link key={index} to={`/profile/${user._id}`} onClick={handleClose} style={{textDecoration: 'inherit' ,color: '#000'}} >
                                    <UserCard user={user} border='border'/>
                                </Link>
                            ))
                        }
                </div>
                <div className="menu">
                    
                    <ul className="navbar-nav flex-row">
                        {
                            navLinks.map((link,index)=>(
                                <li className={`nav-item px-2  ${isActive(link.path)}`}  key={index}>
                                    <Link className="nav-link" to={link.path} >
                                        <span className="material-icons">{link.icon}</span>
                                    </Link>
                                </li>
                            ))
                        }
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                <Avatar src={auth.user.avatar} size='medium-avatar'/>
                            </span>
                            <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>
                                <label htmlFor="theme" className="dropdown-item" onClick={() =>dispatch({type: GLOBALTPES.THEME, payload: !theme})}>{theme ?'Light Mode':'Dark Mode'}</label>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/" onClick={() => dispatch(logout())}>Logout</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;