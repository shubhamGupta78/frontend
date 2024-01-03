import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateUserRequest,singleUserRequest} from "../../actions/adminActions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import {  ADMIN_UPDATE_ROLE_RESET} from "../../constants/adminConstants";
import { sortedGridRowIdsSelector } from "@material-ui/data-grid";


const UpdateUser= ({history,match}) => {
    const alert=useAlert();
    const dispatch=useDispatch();
const {user,loading,error}=useSelector(state=>state.singleUser);
const {isUpdated,error:updatedError}=useSelector(state=>state.updateUsers);
console.log(" value of user is"+ user.email);



const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [role, setRole] = useState("");


    const updateUserSubmitHandler=(e)=>{
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email",email);
        myForm.set("role",role);
       
 

      dispatch(updateUserRequest(match.params.id,myForm));


    }






  useEffect(()=>{

    if(error)
    {
        alert.error(""+error)
        dispatch(clearErrors());
    }

    if(!user || user._id !== match.params.id)
    {
        dispatch(singleUserRequest(match.params.id));
    }
   else{
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
     
   }
   if(isUpdated){
   alert.success("user Updated Successfully");
      history.push("/admin/users");
      dispatch({ type: ADMIN_UPDATE_ROLE_RESET });
   }
    

  },[dispatch,
    history,
    match.params.id,
    user,
    alert,
    error,
    isUpdated
]);

  return (
    <Fragment>
    <MetaData title="Update User" />
    <div className="dashboard">
      <SideBar />
      <div className="newProductContainer">
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={updateUserSubmitHandler}
        >
          <h1>Create Product</h1>

          <div>
            <SpellcheckIcon />
            <input
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <AttachMoneyIcon />
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

         

          <div>
            <AccountTreeIcon />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="" disabled>Choose Role</option>
          
                <option key="admin" value="admin">Admin</option>
                <option key="user" value="user">User</option>
            
            </select>
          </div>

        

         

        

          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
          >
           Update User
          </Button>
        </form>
      </div>
    </div>
  </Fragment>
  )
}

export default UpdateUser
