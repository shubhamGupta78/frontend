import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layouts/Loader/Loader";
import {useHistory} from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile ,loadData} from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { useAlert } from "react-alert";
import profilePng from "../../images/Profile.png";
const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history=useHistory();
 
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading} = useSelector((state) => state.profile);
 
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const [avatar, setAvatar] = useState("");
   const [avatarPreview, setAvatarPreview] = useState(profilePng);
    const updateProfileSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
    
    
        myForm.set("email", email);
      
        myForm.set("avatar", avatar);
        
     

        dispatch(updateProfile(myForm));
      };
    
      const profileDataChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } 
      };
  
     
      useEffect(() => {
        if(user){
            setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
        }
        if (error) {
          alert.error(""+error);
          dispatch(clearErrors());
        }

        if(isUpdated)
        {
            alert.success("Profile updated successfully");
            dispatch(loadData());
            history.push('/account');

            dispatch({
                type: UPDATE_PROFILE_RESET,
              });
        
        }

       
        
      }, [dispatch, error,user,alert, history,isUpdated]);
    
  return (
    <div>
      <Fragment>

{loading ?(<Loader/>):(
<Fragment>
  <div className="updateProfileContainer">
    <div className="updateProfileBox">
      
       
      <form
        className="updateProfileForm"
        encType="multipart/form-data"
        onSubmit={updateProfileSubmit}
      >
        <div className="updateProfileName">
          <FaceIcon />
          <input
            type="text"
            placeholder="Name"
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="updateProfileEmail">
          <MailOutlineIcon />
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div id="updateProfileImage">
          <img src={avatarPreview} alt="Avatar Preview" />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={profileDataChange}
          />
        </div>
        <input type="submit" value="Register" className="updateProfileBtn" />
      </form>
    </div>
  </div>
</Fragment>)}
</Fragment> 
    </div>
  )
}

export default UpdateProfile
