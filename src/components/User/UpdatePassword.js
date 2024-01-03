
import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layouts/Loader/Loader";
import {useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword ,loadData} from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useAlert } from "react-alert";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/LockOpen";
import VpnKeyIcon from "@material-ui/icons/LockOpen";
function UpdatePassword() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history=useHistory();
 
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading} = useSelector((state) => state.profile);
    const [oldPassword,setOldPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
   
    const updatePasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
  
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
       
     

        dispatch(updatePassword(myForm));
      };
    
      
  
     
      useEffect(() => {
       
        if (error) {
          alert.error(""+error);
          dispatch(clearErrors());
        }

        if(isUpdated)
        {
            alert.success("Password updated successfully");
            dispatch(loadData());
            history.push('/account');

            dispatch({
                type: UPDATE_PASSWORD_RESET,
              });
        
        }

       
        
      }, [dispatch, error,user,alert, history,isUpdated]);
  return (
    <div>
    <Fragment>

{loading ?(<Loader/>):(
<Fragment>
<div className="updatePasswordContainer">
  <div className="updatePasswordBox">
    
     
    <form
      className="updatePasswordForm"
      onSubmit={updatePasswordSubmit}
    >
      <div className="updatePassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}

                  />
                </div>
                <div className="updatePassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="updatePassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

     
      <input type="submit" value="Update Password" className="updatePasswordBtn" />
    </form>
  </div>
</div>
</Fragment>)}
</Fragment> 
  </div>
  )
}

export default UpdatePassword
