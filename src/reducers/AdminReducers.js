import axios from 'axios'
import {
    ADMIN_CREATE_PRODUCT_REQUEST,
    ADMIN_CREATE_PRODUCT_SUCCESS,
    ADMIN_CREATE_PRODUCT_RESET,
    ADMIN_CREATE_PRODUCT_FAIL,



    ADMIN_UPDATE_PRODUCT_REQUEST,
    ADMIN_UPDATE_PRODUCT_SUCCESS,
    ADMIN_UPDATE_PRODUCT_RESET,
    ADMIN_UPDATE_PRODUCT_FAIL,

    ADMIN_DELETE_PRODUCT_REQUEST,
    ADMIN_DELETE_PRODUCT_SUCCESS,
    ADMIN_DELETE_PRODUCT_FAIL,
    ADMIN_DELETE_PRODUCT_RESET,

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
    ADMIN_UPDATE_ORDER_RESET,
    ADMIN_UPDATE_ORDER_FAIL,

    ADMIN_DELETE_ORDER_REQUEST,
    ADMIN_DELETE_ORDER_SUCCESS,
    ADMIN_DELETE_ORDER_RESET,
    ADMIN_DELETE_ORDER_FAIL,

    ADMIN_ALL_USER_REQUEST,
    ADMIN_ALL_USER_SUCCESS,
    ADMIN_ALL_USER_FAIL,

    ADMIN_SINGLE_USER_REQUEST,
    ADMIN_SINGLE_USER_SUCCESS,
    ADMIN_SINGLE_USER_FAIL,

    ADMIN_UPDATE_ROLE_REQUEST,
    ADMIN_UPDATE_ROLE_SUCCESS,
    ADMIN_UPDATE_ROLE_RESET,
    ADMIN_UPDATE_ROLE_FAIL,


    ADMIN_DELETE_USER_REQUEST,
    ADMIN_DELETE_USER_SUCCESS,
    ADMIN_DELETE_USER_RESET,
    ADMIN_DELETE_USER_FAIL,

    ADMIN_PRODUCT_REVIEWS_REQUEST,
    ADMIN_PRODUCT_REVIEWS_SUCCESS,
    ADMIN_PRODUCT_REVIEWS_FAIL,


    ADMIN_DELETE_REVIEW_REQUEST,
    ADMIN_DELETE_REVIEW_SUCCESS,
    ADMIN_DELETE_REVIEW_RESET,
    ADMIN_DELETE_REVIEW_FAIL,
 
    CLEAR_ERRORS} from '../constants/adminConstants'



    export const modifyProductReducer = (state = { product: [] }, action) => {
        switch (action.type) {
          case ADMIN_CREATE_PRODUCT_REQUEST:
 case ADMIN_PRODUCT_DETAILS_REQUEST:

            return {
              loading: true,
              product: [],
              ...state,
            };
          case ADMIN_CREATE_PRODUCT_SUCCESS:
case ADMIN_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
              loading: false,
              product: action.payload.Product,
              success:action.payload.success,

            };

            
            case ADMIN_CREATE_PRODUCT_RESET:
                return{
                    ...state,
                    loading:false,
                    success:false,
                }
    
          case ADMIN_CREATE_PRODUCT_FAIL:
        case ADMIN_PRODUCT_DETAILS_FAIL:
            return {
                ...state,
              loading: false,
              error: action.payload,
            };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };


      export const updateProductReducer = (state = { productDetails: [] }, action) => {
        switch (action.type) {
          case ADMIN_UPDATE_PRODUCT_REQUEST:
       return {
         ...state,
              loadings: true,
              productDetails: [],
              isUpdated:false,
             
            };
          case ADMIN_UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
              loadings: false,
              productDetails: action.payload.Product,
             isUpdated:action.payload.success,

            };

            
            case ADMIN_UPDATE_PRODUCT_RESET:
                return{
                    ...state,
                    loadings:false,
                    isUpdated:false,
                    productDetails:[],
                }
    
         case ADMIN_UPDATE_PRODUCT_FAIL:
            return {
                ...state,
              loadings: false,
              updatedError: action.payload,
            };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              updatedError: null,
            };
          default:
            return state;
        }
      };

      export const allProductReducer = (state = { products: {} }, action) => {
        switch (action.type) {
          case ADMIN_ALL_PRODUCT_REQUEST:
            return {
              loading: true,
              ...state,
            };
          case ADMIN_ALL_PRODUCT_SUCCESS:
            return {
                ...state,
              loading: false,
              products: action.payload,
             
            
            };
          case ADMIN_ALL_PRODUCT_FAIL:
            return {
                ...state,
              loading: false,
              error: action.payload,
            };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };

      export const deleteProductReducer = (state = { isDeleted: {} }, action) => {
        switch (action.type) {
          case ADMIN_DELETE_PRODUCT_REQUEST:
            return {
                ...state,
              loading: true,
              isDeleted:false
            
            };
          case ADMIN_DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
              loading: false,
              isDeleted:action.payload,
            
            };
          case ADMIN_DELETE_PRODUCT_FAIL:
            return {
                ...state,
              loading: false,
              error: action.payload,
            };
            case ADMIN_DELETE_PRODUCT_RESET:
                return {
                  ...state,
                  isDeleted: false,
                };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };


      export const getOrdersReducer = (state = { orders: {} }, action) => {
        switch (action.type) {
          case ADMIN_ORDERS_REQUEST:
            return {
              loading: true,
              ...state,
            };
          case ADMIN_ORDERS_SUCCESS:
            return {
                ...state,
              loading: false,
              orders:action.payload.Orders,
              totalAmount:action.payload.totalAmount,
            
            };
          case ADMIN_ORDERS_FAIL:
            return {
                ...state,
              loading: false,
              error: action.payload,
            };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };


      export const modifyOrdersReducer = (state = { isUpdated: {} }, action) => {
        switch (action.type) {
          case ADMIN_UPDATE_ORDER_REQUEST:
             
            return {
              loading: true,
              ...state,
            };
          case ADMIN_UPDATE_ORDER_SUCCESS:
            
            return {
                ...state,
              loading: false,
              isUpdated:action.payload,
            
            };
          case ADMIN_UPDATE_ORDER_FAIL:
            return {
                ...state,
              loading: false,
              error: action.payload,
            };
            case ADMIN_UPDATE_ORDER_RESET:
            return {
                ...state,
              loading: false,
              isUpdated:false,
            };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };

      export const singleOrdersReducer = (state = { order: {} }, action) => {
        switch (action.type) {
          case ADMIN_SINGLE_ORDER_REQUEST:
             
            return {
              loading: true,
              ...state,
            };
          case ADMIN_SINGLE_ORDER_SUCCESS:
            
            return {
                ...state,
              loading: false,
              order:action.payload,
            
            };
          case ADMIN_SINGLE_ORDER_FAIL:
            return {
                ...state,
              loading: false,
              error: action.payload,
            };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };
      export const deleteOrdersReducer = (state = { isOrderDeleted: [] }, action) => {
        switch (action.type) {
          case  ADMIN_DELETE_ORDER_REQUEST:
            return {
              loading: true,
              ...state,
            };
          case ADMIN_DELETE_ORDER_SUCCESS:
            return {
                ...state,
              loading: false,
              isOrderDeleted:action.payload
            
            };
            case ADMIN_DELETE_ORDER_RESET:
            return{
                ...state,
                loading: false,
                isOrderDeleted:false

            };
          case  ADMIN_DELETE_ORDER_FAIL:
            return {
                ...state,
              loading: false,
              error: action.payload,
            };
          
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };


      export const getUsersReducer = (state = { users: {} }, action) => {
        switch (action.type) {
          case  ADMIN_ALL_USER_REQUEST:
            return {
              loading: true,
              ...state,
            };
          case ADMIN_ALL_USER_SUCCESS:
            return {
                ...state,
              loading: false,
              users:action.payload
            
            };
          case  ADMIN_ALL_USER_FAIL:
            return {
                ...state,
              loading: false,
              error: action.payload,
            };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };
      export const UsersReducer = (state = { user:[] }, action) => {
        switch (action.type) {
        case  ADMIN_SINGLE_USER_REQUEST:
            case  ADMIN_UPDATE_ROLE_REQUEST:
            return {
              loading: true,
              ...state,
            };
          case ADMIN_ALL_USER_SUCCESS:
            return {
                ...state,
              loading: false,
              users:action.payload,
            
            };

            case  ADMIN_SINGLE_USER_SUCCESS:
             

                return {
                    ...state,
                    loading: false,
                    user:action.payload.User,
                  
                  };
            case  ADMIN_UPDATE_ROLE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                   isUpdated:action.payload.message
                  
                  };
                  case ADMIN_UPDATE_ROLE_RESET:
                    return {
                        ...state,
                        loading: false,
                       isUpdated:false,
                      
                      };

            


         case ADMIN_SINGLE_USER_FAIL:
             case  ADMIN_UPDATE_ROLE_FAIL:
            return {
                ...state,
              loading: false,
              error: action.payload,
            };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };
      
      export const deleteUserReducer = (state = { isDeletedUser:[] }, action) => {
        switch (action.type) {
          case  ADMIN_DELETE_USER_REQUEST:
       
            return {
              loading: true,
              ...state,
            };
          case ADMIN_DELETE_USER_SUCCESS:
            return {
                ...state,
              loading: false,
              isDeletedUser:action.payload,
              
            
            };
            case ADMIN_DELETE_USER_RESET:
                return {
                    ...state,
                  loading: false,
                  isDeletedUser:false,
                  
                
                };


             case  ADMIN_DELETE_USER_FAIL:
            return {
                ...state,
              loading: false,
              error: action.payload,
            };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };
      
      export const allReviewsReducer = (state = { reviews:[] }, action) => {
        switch (action.type) {
          case   ADMIN_PRODUCT_REVIEWS_REQUEST:
       
            return {
              loading: true,
              ...state,
            };
          case  ADMIN_PRODUCT_REVIEWS_SUCCESS:
            return {
                ...state,
              loading: false,
              reviews:action.payload,
              
            
            };
            case ADMIN_PRODUCT_REVIEWS_FAIL:
                return {
                    ...state,
              loading: false,
              review:[],
              error: action.payload,
                  
                
                };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };
      
      export const deleteReviewReducer = (state = { isDeletedReview:[] }, action) => {
        switch (action.type) {
          case   ADMIN_DELETE_REVIEW_REQUEST:
       
            return {
              loading: true,
              ...state,
            };
          case  ADMIN_DELETE_REVIEW_SUCCESS:
            return {
                ...state,
              loading: false,
              isDeletedReview:action.payload,
              
            
            };

            case ADMIN_DELETE_REVIEW_RESET:
                return {
                    ...state,
              loading: false,
              isDeletedReview:false,
                  
                
                };
            case ADMIN_DELETE_REVIEW_FAIL:
                return {
                    ...state,
              loading: false,
              error: action.payload,
                  
                
                };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };
      
     