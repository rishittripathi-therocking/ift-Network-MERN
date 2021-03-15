import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {useHistory ,Link} from 'react-router-dom';


const Register = () => {

    const {auth} = useSelector(state => state);
    const history = useHistory();
    const dispatch = useDispatch();

    const initialState = {email:'',password:'', fullname:'',username:'',gender:'male',confirm_password:''};
    const [userData, setUserData] = useState(initialState);
    const {email,password, fullname,username,gender,confirm_password} = userData;
    const [typePass, setTypePass] = useState();
    const [typeCnfrmPass, setTypeCnfrmPass] = useState();

    useEffect(() => {
        if(auth.token) history.push("/");
    },[auth.token, history]);
    

    const handleChangeInput = e => {
        const {name,value} = e.target;
        setUserData({...userData,[name]:value}); 
    }
    const handleSubmit = e => {
        e.preventDefault();
    }
    return (
        <React.Fragment>
            
            <div className="container auth_page" >
                <div className="card">
                    <h1 className="text-uppercase text-center">IFT-NETWORK</h1>
                    <article className="card-body">
                        <Link to="/login" className="float-right btn btn-outline-primary text-danger">Login</Link>
                        <h4 className="card-title mb-4 mt-1" style={{fontSize: '33px'}}>Sign Up</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="fullname">Your Full Name</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-user" /></div>
                                    </div>
                                    <input name="fullname" id="fullname" className="form-control" placeholder="Full Name" type="text" onChange={handleChangeInput} value={fullname}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username"> Your Username</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">@</div>
                                    </div>
                                    <input name="username" id="username" className="form-control" placeholder="User Name" type="text" onChange={handleChangeInput} value={username}/>
                                </div>
                            </div> 
                            <div className="form-group">
                                <label htmlFor="emailInput">Your Email</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-envelope" /></div>
                                    </div>
                                    <input name="email" id="emailInput" className="form-control" placeholder="Email" type="email" onChange={handleChangeInput} value={email}/>
                                </div>
                            </div> 
                            <div className="form-group">
                                <label htmlFor="inputPass">Your Password</label>
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
                                <label htmlFor="confirm_password"> Confirm Your Password</label>
                                
                                <div className="pass">
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="fa fa-lock" /></div>
                                        </div>
                                        <input name="confirm_password" id="confirm_password" className="form-control" placeholder="******" type={typeCnfrmPass?"text":"password"} onChange={handleChangeInput} value={confirm_password}/>
                                        <small onClick={()=>setTypeCnfrmPass(!typeCnfrmPass)}><i className={typeCnfrmPass?"fa fa-eye-slash":"fa fa-eye"} /></small>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="form-group justify-content-between row mx-0 mb-2">
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="male" name="gender" className="custom-control-input" value="male" defaultChecked onChange={handleChangeInput}/>
                                    <label className="custom-control-label" htmlFor="male">Male</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="female" name="gender" className="custom-control-input" value="female" onChange={handleChangeInput}/>
                                    <label className="custom-control-label" htmlFor="female">Female</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="other" name="gender" className="custom-control-input" value="other" onChange={handleChangeInput}/>
                                    <label className="custom-control-label" htmlFor="other">Others</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block"> Register </button>
                            </div>                                                      
                        </form>
                    </article>
                </div> 
            </div>
        </React.Fragment>
    )
}

export default Register;