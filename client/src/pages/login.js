import React,{useState} from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
    const initialState = {email:'',password:''};
    const [userData, setUserData] = useState(initialState);
    const {email,password} = userData;
    const handleChangeInput = e => {
        const {name,value} = e.target;
        setUserData({...userData,[name]:value}); 
    }
    return (
        <div className="container auth_page" >
            <h1 className="text-uppercase">IFT-NETWORK</h1>
            <div className="card">
                <article className="card-body">
                    <Link to="/register" className="float-right btn btn-outline-primary text-danger">Register Now</Link>
                    <h4 className="card-title mb-4 mt-1">Sign in</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="emailInput">Your email</label>
                            <input name="email" id="emailInput" className="form-control" placeholder="Email" type="email" onChange={handleChangeInput} value={email}/>
                        </div> 
                        <div className="form-group">
                            <label htmlFor="inputPass">Your password</label>
                            <input name="password" id="inputPass" className="form-control" placeholder="******" type="password" onChange={handleChangeInput} value={password}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" disabled={email&&password?false:true}> Login  </button>
                        </div>                                                      
                    </form>
                </article>
            </div> 
        </div>
    )
}

export default Login;