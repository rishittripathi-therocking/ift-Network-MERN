import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {login} from '../redux/actions/authAction';
import {useDispatch} from 'react-redux';

const Login = () => {
    const initialState = {email:'',password:''};
    const [userData, setUserData] = useState(initialState);
    const {email,password} = userData;

    const dispatch = useDispatch();

    const handleChangeInput = e => {
        const {name,value} = e.target;
        setUserData({...userData,[name]:value}); 
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(userData);
        dispatch(login(userData))
    }
    return (
        <React.Fragment>
            
            <div className="container auth_page" >
                <div className="card">
                    <h1 className="text-uppercase text-center">IFT-NETWORK</h1>
                    <article className="card-body">
                        <Link to="/register" className="float-right btn btn-outline-primary text-danger">Register Now</Link>
                        <h4 className="card-title mb-4 mt-1" style={{fontSize: '33px'}}>Sign in</h4>
                        <form onSubmit={handleSubmit}>
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
        </React.Fragment>
    )
}

export default Login;