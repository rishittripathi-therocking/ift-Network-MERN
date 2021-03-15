import React, {useEffect, useState} from 'react';
import {Link, userLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'; 
import {logout} from '../../redux/actions/authAction';

const Header = () => {
    const navLinks=[
        {label: 'Home', icon: 'home', path:'/'},
        {label: 'Message', icon: 'near_me', path:'/message'},
        {label: 'Discover', icon: 'explore', path:'/discover'},
        {label: 'Notify', icon: 'favorite', path:'/notify'}
    ];

    const {auth} = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark justify-content-between align-middle">
                <Link className="navbar-brand" to='/'>IFT-NETWORK</Link>
                

                <div className="menu">
                    
                    <ul className="navbar-nav flex-row">
                        {
                            navLinks.map((link,index)=>(
                                <li className="nav-item active" key={index}>
                                    <Link className="nav-link" to={link.path}>
                                        <span className="material-icons">{link.icon}</span>
                                    </Link>
                                </li>
                            ))
                        }
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               User
                            </span>
                            <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to={'/profile'}>Profile</Link>
                                <Link className="dropdown-item" to='/'>Dark Mode</Link>
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