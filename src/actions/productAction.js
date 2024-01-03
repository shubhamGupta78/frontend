import axios from 'axios'
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_SUCCESS,
    CLEAR_ERRORS} from '../constants/productConstants'

export const getProduct=(keyword="",currentPage=1,price=[0,25000],category,rating=0)=>async(dispatch)=>{
    try{
        dispatch({
            type:ALL_PRODUCT_REQUEST,
        })

        let link=`http://localhost:5500/api/vi/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;

        if(category)
        link=`http://localhost:5500/api/vi/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;
        
        const {data} =await axios.get(link);
        console.log(data.products);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        });


    }catch(error){
        dispatch({
        type:ALL_PRODUCT_FAIL,
        payload:error,
    })

    }
};


export const getProductDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:PRODUCT_DETAILS_REQUEST,
        })

        const {data} =await axios.get(`http://localhost:5500/api/vi/product/${id}`);
        console.log(data.Product);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload:data.Product,
        });


    }catch(error){
        dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:error,
    })

    }
};

export const createProductReview=(userData)=>async(dispatch)=>{
    try{
        dispatch({
            type: NEW_REVIEW_REQUEST,
        })
 const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
        const {data} =await axios.put(`http://localhost:5500/api/vi/review`,userData,config);
        console.log(data.message);
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload:data.success,
        });


    }catch(error){
        dispatch({
        type: NEW_REVIEW_FAIL,
        payload:error.message,
    })

    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };

