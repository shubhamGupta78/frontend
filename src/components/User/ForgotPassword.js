
import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layouts/Loader/Loader";
import {useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword ,loadData} from "../../actions/userAction";
//import { forgot_PASSWORD_RESET } from "../../constants/userConstants";
import { useAlert } from "react-alert";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
function ForgotPassword() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history=useHistory();
 
    const { error, isUpdated, loading} = useSelector((state) => state.profile);
    const [email,setEmail]=useState("");
   
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
  
        myForm.set("email", email);

        dispatch(forgotPassword(myForm));
      };
    
      
  
     
      useEffect(() => {
       
        if (error) {
          alert.error(""+error);
          dispatch(clearErrors());
        }

        if(isUpdated)
        {
            alert.success("Email sent successfully");

            // dispatch({
            //     type: forgot_PASSWORD_RESET,
            //   });
        
        }

       
        
      }, [dispatch, error,alert, history,isUpdated]);
  return (
    <div>
   <Fragment> 
       {loading?(<Loader/>):(<Fragment>
<div className="forgotPasswordContainer">
  <div className="forgotPasswordBox">
    
     
    <form
      className="forgotPasswordForm"
      onSubmit={forgotPasswordSubmit}
    >
                    
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
              

     
      <input type="submit" value="forgot Password" className="forgotPasswordBtn" />
    </form>
  </div>
</div>
</Fragment> )}
 
</Fragment> 

  </div>
  )
}

export default ForgotPassword
