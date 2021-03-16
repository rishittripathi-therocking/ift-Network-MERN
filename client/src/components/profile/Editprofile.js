import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {checkImage} from '../../utils/imageUpload';
import {GLOBALTYPES} from '../../redux/actions/globalType';
import {updaProfileUser} from '../../redux/actions/profileAction';

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
    const {fullname,mobile,address,website,story, gender} = userData;

    const [avatar, setAvatar] = useState('');
    const {auth} = useSelector(state => state);

    const dispatch = useDispatch();

    const cahngeAvatar = (e) => {
        const file = e.target.files[0];
        const err = checkImage(file);
        if(err) return dispatch({type:GLOBALTYPES.ALERT , payload: {error:err}});
        setAvatar(file);
    }

    const handleInput = (e) => {
        const {name,value} = e.target;
        setUserData({...userData,[name]:value});
    }

    useEffect(()=>{
        setUserData(auth.user);
    },[auth.user]);

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        dispatch(updaProfileUser({userData,avatar,auth}))
    }

    return (
        <div className="edit_profile">
            <div className="close-container" onClick={()=>setOnEdit(false)}>
                <div className="leftright"></div>
                <div className="rightleft"></div>
                <label className="close">close</label>
            </div>
            <form className="pt-4" onSubmit={handleEditFormSubmit}>
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
                
                <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select name="gender" id="gender" className="custom-select text-capitalize" onChange={handleInput} value={gender}>
                        <option value="male"> Male</option>
                        <option value="female"> Female</option>
                        <option value="other"> Other</option>
                    </select>
                </div>
                <div className="pt-3" style={{position: 'relative', left:'25%'}}>
                    <button type="submit" className="button button-4 button-4a icon-arrow-right" style={{outline: 'none'}}><i className="fa fa-arrow-right"></i>Save</button>
                </div>
            </form>
        </div>
    )
}
 
export default EditProfile;