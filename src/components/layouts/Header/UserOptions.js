import React, { Fragment,useState,useEffect } from 'react'
import './Header.css'
import { Backdrop } from '@material-ui/core';
import {SpeedDial,SpeedDialAction} from '@material-ui/lab'
import profilePng from "../../../images/Profile.png";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch,useSelector} from 'react-redux';
import { logout } from "../../../actions/userAction";
import { getMyOrders } from "../../../actions/orderAction";
import { useAlert } from "react-alert";
import {useHistory } from "react-router-dom"
const UserOptions = ({user}) => {
    const history=useHistory()
    const dispatch=useDispatch();

    const alert=useAlert();
    const [open,setOpen]=useState(false);
    const {cartItems}=useSelector((state)=>state.cart)

    function dashboard(){

        history.push('/admin/dashboard');

    }

    function orders(){
        dispatch(getMyOrders());
        history.push('/orders');

    }
    function logouts(){
        dispatch(logout());
        history.push("/login");
        console.log("gandu");
              
        alert.success("logout successfully");
       
    }
    function cart(){
        history.push('/cart');

    }

    function account(){
        history.push('/account');

    }

   
  return (
     
    <Fragment>
 <Backdrop open={open} style={{zIndex:"10"}}/>
        <SpeedDial
        ariaLabel="speed dial tooltip example"
        onClose={()=>{setOpen(false)}}
        onOpen={()=>{setOpen(true)}}
        open={open}
        direction="down"
        className='speedDial'
        style={{zIndex:"11"}}
        icon={
            <img className='speedDialIcon'
                src={user.avatar.url ? user.avatar.url:profilePng}
                alt="profile"
                />
            }>

  {user.role==="admin"?(<SpeedDialAction icon={<DashboardIcon/>} tooltipTitle="Dashboard" onClick={dashboard}/>):"" }              
<SpeedDialAction icon={<PersonIcon/>} tooltipTitle="My-Info" onClick={account}/>
<SpeedDialAction icon={<ExitToAppIcon/>} tooltipTitle="Logout" onClick={logouts}/>
<SpeedDialAction icon={<ListAltIcon/>} tooltipTitle="My Orders" onClick={orders}/>
<SpeedDialAction icon={<ShoppingCartIcon  style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}/>} tooltipTitle={`${cartItems.length}`} onClick={cart} tooltipOpen={window.innerWidth <= 600 ? true : false}/>

                </SpeedDial>
        
    </Fragment>
  )
}

export default UserOptions
