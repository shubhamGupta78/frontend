import axios from 'axios'
import {
    ADMIN_CREATE_PRODUCT_REQUEST,
    ADMIN_CREATE_PRODUCT_SUCCESS,
    ADMIN_CREATE_PRODUCT_RESET,
    ADMIN_CREATE_PRODUCT_FAIL,


    ADMIN_UPDATE_PRODUCT_REQUEST,
    ADMIN_UPDATE_PRODUCT_SUCCESS,
    ADMIN_UPDATE_PRODUCT_FAIL,

    ADMIN_DELETE_PRODUCT_REQUEST,
    ADMIN_DELETE_PRODUCT_SUCCESS,
    ADMIN_DELETE_PRODUCT_FAIL,

    ADMIN_ALL_PRODUCT_REQUEST,
    ADMIN_ALL_PRODUCT_SUCCESS,
    ADMIN_ALL_PRODUCT_FAIL,

    ADMIN_PRODUCT_DETAILS_REQUEST,
    ADMIN_PRODUCT_DETAILS_SUCCESS,
    ADMIN_PRODUCT_DETAILS_FAIL,

    ADMIN_ORDERS_REQUEST,
    ADMIN_ORDERS_SUCCESS,
    ADMIN_ORDERS_FAIL,

    ADMIN_SINGLE_ORDER_REQUEST,
    ADMIN_SINGLE_ORDER_SUCCESS,
    ADMIN_SINGLE_ORDER_FAIL,

    ADMIN_UPDATE_ORDER_REQUEST,
    ADMIN_UPDATE_ORDER_SUCCESS,
   
    ADMIN_UPDATE_ORDER_FAIL,

    ADMIN_DELETE_ORDER_REQUEST,
    ADMIN_DELETE_ORDER_SUCCESS,
    ADMIN_DELETE_ORDER_FAIL,

    ADMIN_ALL_USER_REQUEST,
    ADMIN_ALL_USER_SUCCESS,
    ADMIN_ALL_USER_FAIL,

    ADMIN_SINGLE_USER_REQUEST,
    ADMIN_SINGLE_USER_SUCCESS,
    ADMIN_SINGLE_USER_FAIL,

    ADMIN_UPDATE_ROLE_REQUEST,
    ADMIN_UPDATE_ROLE_SUCCESS,
    ADMIN_UPDATE_ROLE_FAIL,

    ADMIN_DELETE_USER_REQUEST,
    ADMIN_DELETE_USER_SUCCESS,
    ADMIN_DELETE_USER_FAIL,

    ADMIN_PRODUCT_REVIEWS_REQUEST,
    ADMIN_PRODUCT_REVIEWS_SUCCESS,
    ADMIN_PRODUCT_REVIEWS_FAIL,


    ADMIN_DELETE_REVIEW_REQUEST,
    ADMIN_DELETE_REVIEW_SUCCESS,
    ADMIN_DELETE_REVIEW_RESET,
    ADMIN_DELETE_REVIEW_FAIL,

 
    CLEAR_ERRORS} from '../constants/adminConstants'

export const getProduct=()=>async(dispatch)=>{
    try{
        dispatch({
            type:ADMIN_ALL_PRODUCT_REQUEST,
        })
console.log("lkjbfadsfdalfjb");

const config = { headers: { "Content-Type": "application/json" },
// credentials: 'include', 
 withCredentials: true 
};
        let link=`http://localhost:5500/api/vi/admin/products`;

        
        
        const {data} =await axios.get(link,config);
        console.log(data.products);
        dispatch({
            type:ADMIN_ALL_PRODUCT_SUCCESS,
            payload:data.products,
        });


    }catch(error){
        dispatch({
        type:ADMIN_ALL_PRODUCT_FAIL,
        payload:error,
    })

    }
};


export const getProductDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:ADMIN_PRODUCT_DETAILS_REQUEST,
        })
        const config = { headers: { "Content-Type": "application/json" },
        // credentials: 'include', 
         withCredentials: true 
        };
           console.log("hi shubh"); 
        const {data} =await axios.get(`http://localhost:5500/api/vi/admin/product/${id}`,config);
        console.log(data.Product);
        dispatch({
            type: ADMIN_PRODUCT_DETAILS_SUCCESS,
            payload:data,
        });


    }catch(error){
        dispatch({
        type:ADMIN_PRODUCT_DETAILS_FAIL,
        payload:error,
    })

    }
};

export const createProductRequest=(productData)=>async(dispatch)=>{
    console.log("valdelkenfe");
        console.log("valde;kldenfde");
    try{
        dispatch({
            type: ADMIN_CREATE_PRODUCT_REQUEST,
        })
 const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
        const {data} =await axios.post(`http://localhost:5500/api/vi/admin/product/new`,productData,config);
        console.log("api respomnse",data);
        dispatch({
            type: ADMIN_CREATE_PRODUCT_SUCCESS,
            payload:data,
        });


    }catch(error){
        dispatch({
        type: ADMIN_CREATE_PRODUCT_FAIL,
        payload:error.message,
    })

    }
};


export const updateProductRequest=(id,productData)=>async(dispatch)=>{
    try{
        dispatch({
            type:  ADMIN_UPDATE_PRODUCT_REQUEST,
        })
 const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
        const {data} =await axios.put(`http://localhost:5500/api/vi/admin/product/${id}`,productData,config);
        
        dispatch({
            type:  ADMIN_UPDATE_PRODUCT_SUCCESS,
            payload:data,
        });


    }catch(error){
        dispatch({
        type:  ADMIN_UPDATE_PRODUCT_FAIL,
        payload:error.response.data.message,
    })

    }
};

export const deleteProductRequest=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:  ADMIN_DELETE_PRODUCT_REQUEST,
        })
 const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
        const {data} =await axios.delete(`http://localhost:5500/api/vi/admin/product/${id}`,config);
        
        dispatch({
            type:  ADMIN_DELETE_PRODUCT_SUCCESS,
            payload:data.success,
        });


    }catch(error){
        dispatch({
        type:  ADMIN_DELETE_PRODUCT_FAIL,
        payload:error.response.data.message,
    })

    }
};



//  Order Actions
export const allOrdersRequest=()=>async(dispatch)=>{
    try{
        dispatch({
            type:  ADMIN_ORDERS_REQUEST,
        })
 const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
        const {data} =await axios.get(`http://localhost:5500/api/vi/admin/orders`,config);
        
        dispatch({
            type:  ADMIN_ORDERS_SUCCESS,
            payload:data,
        });


    }catch(error){
        dispatch({
        type:  ADMIN_ORDERS_FAIL,
        payload:error.message,
    })

    }
};

export const singleOrderDetails=(id)=>async(dispatch)=>{
    try{
            
        dispatch({
            type: ADMIN_SINGLE_ORDER_REQUEST,
        });

        const config = { 
            headers: { 
                "Content-Type": "application/json" 
            } ,
            withCredentials: true
        };
        const {data}=await axios.get(`http://localhost:5500/api/vi/admin/order/${id}`,config);
        dispatch({
            type: ADMIN_SINGLE_ORDER_SUCCESS,
            payload:data.Order,
        });

}

catch(error){
    dispatch({
        type: ADMIN_SINGLE_ORDER_FAIL,
        payload:error.response.data.message,


    });

    
}
}

export const updateOrderRequest=(id,orderData)=>async(dispatch)=>{
    try{
        dispatch({
            type:  ADMIN_UPDATE_ORDER_REQUEST,
        })
 const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
        const {data} =await axios.put(`http://localhost:5500/api/vi/admin/order/${id}`,orderData,config);
        
        dispatch({
            type:  ADMIN_UPDATE_ORDER_SUCCESS,
            payload:data.success
        });


    }catch(error){
        dispatch({
        type:  ADMIN_UPDATE_ORDER_FAIL,
        payload:error.message,
    })

    }
};

export const deleteOrderRequest=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:  ADMIN_DELETE_ORDER_REQUEST,
        })
 const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
        const {data} =await axios.delete(`http://localhost:5500/api/vi/admin/order/${id}`,config);
        
        dispatch({
            type:  ADMIN_DELETE_ORDER_SUCCESS,
            payload:data.success
        });


    }catch(error){
        dispatch({
        type:  ADMIN_DELETE_ORDER_FAIL,
        payload:error.message,
    })

    }
};

// USERS ACTIONS

export const allUsersRequest=()=>async(dispatch)=>{
    try{
        dispatch({
            type:  ADMIN_ALL_USER_REQUEST,
        })
 const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
        const {data} =await axios.get(`http://localhost:5500/api/vi/admin/users`,config);
        
        dispatch({
            type:  ADMIN_ALL_USER_SUCCESS,
            payload:data.User,
        });


    }catch(error){
        dispatch({
        type:  ADMIN_ALL_USER_FAIL,
        payload:error.message,
    })

    }
};


export const singleUserRequest=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:  ADMIN_SINGLE_USER_REQUEST,
        })
 const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
        const {data} =await axios.get(`http://localhost:5500/api/vi/admin/user/${id}`,config);
        
        dispatch({
            type:  ADMIN_SINGLE_USER_SUCCESS,
            payload:data,
        });


    }catch(error){
        dispatch({
        type:  ADMIN_SINGLE_USER_FAIL,
        payload:error.message,
    })

    }
};

export const updateUserRequest=(id,userData)=>async(dispatch)=>{
    try{
        dispatch({
            type:  ADMIN_UPDATE_ROLE_REQUEST,
        })
 const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
        const {data} =await axios.put(`http://localhost:5500/api/vi/admin/user/update/${id}`,userData,config);
        
        dispatch({
            type:  ADMIN_UPDATE_ROLE_SUCCESS,
            payload:data,
        });


    }catch(error){
        dispatch({
        type:  ADMIN_UPDATE_ROLE_FAIL,
        payload:error.message,
    })

    }
};

export const deleteUserRequest=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:  ADMIN_DELETE_USER_REQUEST,
        })
 const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
        const {data} =await axios.delete(`http://localhost:5500/api/vi/admin/user/delete/${id}`,config);
        
        dispatch({
            type:  ADMIN_DELETE_USER_SUCCESS,
            payload:data.success,
        });


    }catch(error){
        dispatch({
        type:  ADMIN_DELETE_USER_FAIL,
        payload:error.message,
    })

    }
};



export const getAllReviewsRequest=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:  ADMIN_PRODUCT_REVIEWS_REQUEST,
        })
 const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
        const {data} =await axios.get(`http://localhost:5500/api/vi/admin/product/reviews/${id}`,config);
        
        dispatch({
            type:ADMIN_PRODUCT_REVIEWS_SUCCESS,
            payload:data.reviews,
        });


    }catch(error){
        dispatch({
        type:ADMIN_PRODUCT_REVIEWS_FAIL,
        payload:error.message,
    })

    }
};



export const deleteReviewRequest=(id,datas)=>async(dispatch)=>{
    try{
        dispatch({
            type:  ADMIN_DELETE_REVIEW_REQUEST,
        })
 const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
        const {data} =await axios.post(`http://localhost:5500/api/vi/admin/product/delete/review/${id}`,datas,config);
        
        dispatch({
            type:ADMIN_DELETE_REVIEW_SUCCESS,
            payload:data.success,
        });


    }catch(error){
        dispatch({
        type:ADMIN_DELETE_REVIEW_FAIL,
        payload:error.message,
    })

    }
};





// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };

