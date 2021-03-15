import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {login} from '../redux/actions/authAction';
import {useDispatch,useSelector} from 'react-redux';

const Login = () => {
    const {auth} = useSelector(state => state);
    const history = useHistory();
    const initialState = {email:'',password:''};
    const [userData, setUserData] = useState(initialState);
    const {email,password} = userData;

    const [typePass, setTypePass] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        if(auth.token) history.push("/");
    },[auth.token, history]);

    const handleChangeInput = e => {
        const {name,value} = e.target;
        setUserData({...userData,[name]:value}); 
    }
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(login(userData));
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
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-envelope" /></div>
                                    </div>
                                    <input name="email" id="emailInput" className="form-control" placeholder="Email" type="email" onChange={handleChangeInput} value={email}/>
                                </div>
                            </div> 
                            <div className="form-group">
                                <label htmlFor="inputPass">Your password</label>
                                <div className="pass">
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="fa fa-lock" /></div>
                                        </div>
                                        <input name="password" id="inputPass" className="form-control" placeholder="******" type={typePass?"text":"password"} onChange={handleChangeInput} value={password}/>
                                        <small onClick={()=>setTypePass(!typePass)}><i className={typePass?"fa fa-eye-slash":"fa fa-eye"} /></small>
                                    </div>
                                </div>
                                
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