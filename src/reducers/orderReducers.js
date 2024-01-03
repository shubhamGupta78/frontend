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

export const orderReducer=(state = { order: [] }, action)=>{

    switch(action.type){
        
        case CREATE_ORDER_REQUEST:
     
            return{
                loading:true,
                order:[],
            };

        

           
        case CREATE_ORDER_SUCCESS:
      
            return{
                ...state,
                loading:false,
                order:action.payload,
            };
            
                
        case CREATE_ORDER_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
                order:null,

            };
            
                
        case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
        default:
            return{
                ...state,
            };
        };

}

export const myOrderReducer=(state = { orders: [] }, action)=>{

    switch(action.type){
        
        case MY_ORDER_REQUEST:
            return{
                loading:true,
            };

        case MY_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                orders:action.payload,
            };
            
        case MY_ORDER_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
                orders:null,

            };
            
                
        case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
        default:
            return{
                ...state,
            };
        };

}

export const singleOrderReducer=(state = { order: [] }, action)=>{

    switch(action.type){
        
        case SINGLE_ORDER_REQUEST:
            return{
                loading:true,
            };

        case SINGLE_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                order:action.payload,
            };
            
        case SINGLE_ORDER_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,

            };
            
                
        case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
        default:
            return{
                ...state,
            };
        };

}


