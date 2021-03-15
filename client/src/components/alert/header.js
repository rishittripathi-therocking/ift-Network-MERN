import React, {useEffect, useState} from 'react';
import {Link, userLocation} from 'react-router-dom';

const Header = () => {
    const navLinks=[
        {label: 'Home', icon: 'home', path:'/'},
        {label: 'Message', icon: 'near_me', path:'/message'},
        {label: 'Discover', icon: 'explore', path:'/discover'},
        {label: 'Notify', icon: 'favorite', path:'/notify'}
    ]
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark justify-content-between align-middle">
                <Link className="navbar-brand" to='/'>IFT-NETWORK</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               User
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Profile</a>
                                <a className="dropdown-item" href="#">Dark Mode</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;