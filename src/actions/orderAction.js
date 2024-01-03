import axios from 'axios'
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    SINGLE_ORDER_REQUEST,
    SINGLE_ORDER_SUCCESS,
    SINGLE_ORDER_FAIL,
    CLEAR_ERRORS} from "../constants/orderConstants";


export const saveOrderInfo=(orderData)=>async(dispatch)=>{
    try{
            
        dispatch({
            type:CREATE_ORDER_REQUEST,
        });

        const config = { 
            headers: { 
                "Content-Type": "application/json" 
            } ,
            withCredentials: true
        };
        const {data}=await axios.post('http://localhost:5500/api/vi/order/new',orderData,config);

        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload:data.Order,
        });
    }
        catch(error){
            dispatch({
                type:CREATE_ORDER_FAIL,
                payload:error.response.data.message,
        
        
            });
        
}
}

export const getMyOrders=()=>async(dispatch)=>{
    try{
            
        dispatch({
            type:MY_ORDER_REQUEST,
        });

        const config = { 
            headers: { 
                "Content-Type": "application/json" 
            } ,
            withCredentials: true
        };
        const {data}=await axios.get('http://localhost:5500/api/vi/order/me',config);
console.log("value of"+data.Order);
        dispatch({
            type:MY_ORDER_SUCCESS,
            payload:data.Order,
        });

}

catch(error){
    dispatch({
        type:MY_ORDER_FAIL,
        payload:error.response.data.message,


    });

    
}



}

export const getOrderDetails=(id)=>async(dispatch)=>{
    try{
            
        dispatch({
            type:SINGLE_ORDER_REQUEST,
        });

        const config = { 
            headers: { 
                "Content-Type": "application/json" 
            } ,
            withCredentials: true
        };
        const {data}=await axios.get(`http://localhost:5500/api/vi/order/${id}`,config);
        dispatch({
            type:SINGLE_ORDER_SUCCESS,
            payload:data.Order,
        });

}

catch(error){
    dispatch({
        type:SINGLE_ORDER_FAIL,
        payload:error.response.data.message,


    });

    
}
}




export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
