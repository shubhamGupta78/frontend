
import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layouts/Loader/Loader";
import {useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors,resetPassword} from "../../actions/userAction";
//import { reset_PASSWORD_RESET } from "../../constants/userConstants";
import { useAlert } from "react-alert";
import LockOpenIcon from "@material-ui/icons/LockOpen";
function ResetPassword({match}) {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history=useHistory();
 
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading} = useSelector((state) => state.profile);
    const [password,setPassword]=useState("");
  console.log("value of token"+match.params.token);
   
    const resetPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
  
        myForm.set("password",password);
     

        dispatch(resetPassword(match.params.token,myForm));
      };
    
      
  
     
      useEffect(() => {
       
        if (error) {
          alert.error(""+error);
          dispatch(clearErrors());
        }

        if(isUpdated)
        {
            alert.success("Password reset successfully");
            history.push('/login');

            
        
        }

       
        
      }, [dispatch, error,user,alert, history,isUpdated]);
  return (
    <div>
    <Fragment>

{loading ?(<Loader/>):(
<Fragment>
<div className="resetPasswordContainer">
  <div className="resetPasswordBox">
    
     
    <form
      className="resetPasswordForm"
      onSubmit={resetPasswordSubmit}
    >
      <div className="resetPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Enter new Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                  />
                </div>
               
                

     
      <input type="submit" value="reset Password" className="resetPasswordBtn" />
    </form>
  </div>
</div>
</Fragment>)}
</Fragment> 
  </div>
  )
}

export default ResetPassword
