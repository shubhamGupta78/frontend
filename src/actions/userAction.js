import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

    
    UPDATE_PASSWORD_REQUEST,


    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,


    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,


    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,


    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/userConstants.js";
  import axios from "axios";

export const login=(email,password)=>async(dispatch)=>{
    try{
            dispatch({
                type:LOGIN_REQUEST,
            });

            const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
            const {data}=await axios.post('http://localhost:5500/api/vi/login',{email,password},config);

            dispatch({
                type:LOGIN_SUCCESS,
                payload:data.User,
            });

    }
    catch(error){
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message,


        });
    }


}
export const logout=()=>async(dispatch)=>{
    try{
            

            const config = { withCredentials: true };
            // credentials: 'include', 
            const {data}=await axios.get('http://localhost:5500/api/vi/logout',config);
            console.log("value of response"+data.message);
            dispatch({
                type:LOGOUT_SUCCESS
            });
            console.log("meesage is shubh");

    }
    catch(error){
        console.log("hi sahubh");
        console.log("meesage is"+error);
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.message,


        });
    }


}

export const loadData=()=>async(dispatch)=>{
    try{
         
            dispatch({
                type:LOAD_USER_REQUEST,
            });

            const {data}=await axios.get('http://localhost:5500/api/vi/me',{
                withCredentials: true
            });

            dispatch({
                type:LOAD_USER_SUCCESS,
                payload:data.User,
            });

    }
    catch(error){
        dispatch({
            type:LOAD_USER_FAIL,
            payload:error.message


        });
    }


}
export const updateProfile=(userData)=>async(dispatch)=>{
    try{
         
            dispatch({
                type:UPDATE_PROFILE_REQUEST,
            });

            const config = { 
                headers: { 
                    "Content-Type": "multipart/form-data" 
                } ,
                withCredentials: true
            };

            const {data}=await axios.put('http://localhost:5500/api/vi/me/updateProfile',userData,config);

            dispatch({
                type:UPDATE_PROFILE_SUCCESS,
                payload:data.success
            });

    }
    catch(error){
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload:error.response.data.message


        });
    }


}

export const updatePassword=(userData)=>async(dispatch)=>{
    try{
            console.log(userData);
            dispatch({
                type:UPDATE_PASSWORD_REQUEST,
            });

            const config = { 
                withCredentials: true
            };

            const {data}=await axios.put('http://localhost:5500/api/vi/password/updatePassword',userData,config);

            dispatch({
                type:UPDATE_PASSWORD_SUCCESS,
                payload:data.success
            });

    }
    catch(error){
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload:error.response.data.message


        });
    }


}

export const resetPassword=(token,password)=>async(dispatch)=>{
    try{
            console.log(token);
            console.log(password);
            dispatch({
                type:RESET_PASSWORD_REQUEST,
            });

            const config = { 
                withCredentials: true
            };

            const {data}=await axios.post(`http://localhost:5500/api/vi/password/reset/${token}`,password,config);

            dispatch({
                type:RESET_PASSWORD_SUCCESS,
                payload:data.message
            });

    }
    catch(error){
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload:error.response.data.message


        });
    }


}

export const forgotPassword=(userData)=>async(dispatch)=>{
    try{
            console.log(userData);
            dispatch({
                type:FORGOT_PASSWORD_REQUEST,
            });

            const config = { 
                withCredentials:true
            };

            const {data}=await axios.post('http://localhost:5500/api/vi/password/forgot',userData,config);

            dispatch({
                type:FORGOT_PASSWORD_SUCCESS,
                payload:data.message
            });

    }
    catch(error){
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload:error.message


        });
    }


}
export const register=(userData)=>async(dispatch)=>{
    try{
            
            dispatch({
                type:REGISTER_USER_REQUEST,
            });

            const config = { 
                headers: { 
                    "Content-Type": "multipart/form-data" 
                } ,
                withCredentials: true
            };
            const {data}=await axios.post('http://localhost:5500/api/vi/register',userData,config);

            dispatch({
                type:REGISTER_USER_SUCCESS,
                payload:data.user,
            });

    }
    catch(error){
        dispatch({
            type:REGISTER_USER_FAIL,
            payload:error,


        });
    }


}


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };

