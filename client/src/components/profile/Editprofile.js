import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {checkImage} from '../../utils/imageUpload';
import {GLOBALTPES} from '../../redux/actions/globalType';

const EditProfile = ({setOnEdit}) => {
    const initialState = {
        fullname: '',
        mobile: '',
        address: '',
        website: '',
        story: '',
        gender: ''
    }
    const [userData, setUserData] = useState(initialState);
    const {fullname,mobile,address,website,story} = userData;

    const [avatar, setAvatar] = useState('');
    const {auth} = useSelector(state => state);

    const dispatch = useDispatch();

    const cahngeAvatar = (e) => {
        const file = e.target.files[0];
        const err = checkImage(file);
        if(err) return dispatch({type:GLOBALTPES.ALERT , payload: {error:err}});
        setAvatar(file);
    }

    const handleInput = (e) => {
        const {name,value} = e.target;
        setUserData({...userData,[name]:value});
    }

    useEffect(()=>{
        setUserData(auth.user);
    },[auth.user]);

    return (
        <div className="edit_profile">
            <div className="close-container" onClick={()=>setOnEdit(false)}>
                <div className="leftright"></div>
                <div className="rightleft"></div>
                <label className="close">close</label>
            </div>
            <form className="pt-4">
                <div className="info_avatar">
                    <img src={avatar? URL.createObjectURL(avatar): auth.user.avatar} className="large-avatar"  alt="avatar"/>
                    <span className="px-2">
                        <i className="fas fa-camera"/>
                        <p>Change Avatar</p>
                        <input type="file" name="file" id="file_up" accept="image/*" onChange={cahngeAvatar} />
                    </span>
                </div>
                <div className="form-group form_group pt-3">
                    <label htmlFor="fullname">Full Name</label>
                        <div className="input-group mb-2" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-user" /></div>
                                </div>
                            <input type="text" placeholder="fullname" className="form-control" id="fullname" name="fullname" value={fullname} onChange={handleInput} />
                        </div>
                    <div className="position-relative">
                        <small className="text-danger position-absolute" style={{right:'5px',transform: 'translateY(-50%)'}}>
                            {fullname.length}/25
                        </small>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <div className="input-group mb-2" >
                         <div className="input-group-prepend">
                            <div className="input-group-text"><i className="fa fa-phone" /></div>
                        </div>
                        <input type="number" className="form-control" name="mobile" value={mobile} onChange={handleInput} placeholder="1234567892"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <div className="input-group mb-2" >
                         <div className="input-group-prepend">
                            <div className="input-group-text"><i className="fa fa-map-marker" /></div>
                        </div>
                        <input type="text" className="form-control" name="address" value={address} onChange={handleInput} placeholder="address"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <div className="input-group mb-2" >
                         <div className="input-group-prepend">
                            <div className="input-group-text"><i className="fa fa-globe" /></div>
                        </div>
                        <input type="text" className="form-control" name="website" value={website} onChange={handleInput} placeholder="website"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="story">Story</label>
                    <textarea className="form-control" name="story" cols="30" rows="4" value={story} onChange={handleInput} placeholder="story"/>
                    <small className="text-danger d-block text-right mt-2" style={{right:'5px',transform: 'translateY(-50%)'}}>
                        {story.length}/200
                    </small>
                </div>
                <div className="form-group justify-content-between row mx-0 mb-2">
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="male" name="gender" className="custom-control-input" value="male" defaultChecked onChange={handleInput}/>
                        <label className="custom-control-label" htmlFor="male">Male</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="female" name="gender" className="custom-control-input" value="female" onChange={handleInput}/>
                        <label className="custom-control-label" htmlFor="female">Female</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="other" name="gender" className="custom-control-input" value="other" onChange={handleInput}/>
                        <label className="custom-control-label" htmlFor="other">Others</label>
                    </div>
                </div>
                <div className="pt-3" style={{position: 'relative', left:'25%'}}>
                    <button type="submit" className="button button-4 button-4a icon-arrow-right" style={{outline: 'none'}}><i className="fa fa-arrow-right"></i>Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile;