import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productsReducer,productDetailsReducer,newReviewReducer} from './reducers/ProductReducer'
import {allProductReducer,deleteProductReducer,modifyProductReducer,updateProductReducer,getOrdersReducer,deleteOrdersReducer,singleOrdersReducer,modifyOrdersReducer,getUsersReducer,UsersReducer,deleteUserReducer,allReviewsReducer,deleteReviewReducer} from './reducers/AdminReducers'
import {userReducer,profileReducer} from './reducers/UserReducers'
import { cartReducer } from './reducers/CartReducer'
import { orderReducer,myOrderReducer,singleOrderReducer } from './reducers/orderReducers'
const reducer=combineReducers({
    products:productsReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    cart:cartReducer,
    order:orderReducer,
    orders:myOrderReducer,
    singleOrder:singleOrderReducer,
    review:newReviewReducer,
    adminProducts:allProductReducer,
    deleteProduct:deleteProductReducer,
    modifyProduct:modifyProductReducer,
    updateProduct:updateProductReducer,
    adminOrders:getOrdersReducer,
    deleteOrder:deleteOrdersReducer,
    singleOrders:singleOrdersReducer,
    modifyOrder:modifyOrdersReducer,
    getUsers:getUsersReducer,
    singleUser:UsersReducer,
    updateUsers:UsersReducer,
    deleteUser:deleteUserReducer,
    allReviews:allReviewsReducer,
    deleteReview:deleteReviewReducer,
})

let initialState={

    cart:{
        cartItems:
            localStorage.getItem("cartItems")?
            JSON.parse(localStorage.getItem("cartItems")):[],


        shippingInfo:
        localStorage.getItem("shippingInfo")?
            JSON.parse(localStorage.getItem("shippingInfo")):[],

    }
        
   
};

const middleware=[thunk];

const Store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default Store;