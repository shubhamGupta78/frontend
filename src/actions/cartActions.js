import {ADD_TO_CART,REMOVE_FROM_CART,SAVE_SHIPPING_INFO} from  "../constants/cartConstants";
import axios from 'axios'

export const addItemsToCart=(id,quantity)=>async(dispatch,getState)=>{
    
            console.log("id"+id);
            console.log("quant"+quantity);

            const config = { headers: { "Content-Type": "application/json" },
            // credentials: 'include', 
             withCredentials: true 
        };
            const {data}=await axios.get(`http://localhost:5500/api/vi/product/${id}`);
        console.log(data.Product)
            dispatch({
                type:ADD_TO_CART,
                payload: {
                    product: data.Product._id,
                    name: data.Product.name,
                    price: data.Product.price,
                    image: data.Product.images[0].url,
                    stock: data.Product.Stock,
                    quantity,
                  },
            });


            localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));

   


}

export const removeItemsFromCart=(id)=>async(dispatch,getState)=>{
    
   

    const config = { headers: { "Content-Type": "application/json" },
    // credentials: 'include', 
     withCredentials: true 
};
   
    dispatch({
        type:REMOVE_FROM_CART,
        payload:id

    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));




}

export const saveShippingInfo=(data)=>async(dispatch,getState)=>{
    
   

    const config = { headers: { "Content-Type": "application/json" },
    // credentials: 'include', 
     withCredentials: true 
};
   
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data,

    })

    localStorage.setItem("shippingInfo",JSON.stringify(data));




}