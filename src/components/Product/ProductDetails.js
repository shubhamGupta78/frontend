import React, { Fragment, useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./productDetails.css"
import {getProductDetails,createProductReview} from "../../actions/productAction"
import {useDispatch,useSelector} from "react-redux"
import Loader from '../layouts/Loader/Loader'
import ReviewCard from './ReviewCard'
import ReactStars from 'react-rating-stars-component'
import MetaData from '../layouts/MetaData';
import { addItemsToCart } from '../../actions/cartActions';
import { useAlert } from "react-alert";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@material-ui/core";
  import { Rating } from "@material-ui/lab";
  import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { trusted } from 'mongoose';
 
  
const ProductDetails = ({match}) => {
    const alert=useAlert();
     const dispatch=useDispatch();
     const {loading,product,error} = useSelector((state) => state.productDetails);
     const {review}= useSelector((state) => state.review);
     console.log("value of review"+review);
  
     const [quantity,setQuantity]=useState(1);
     const[open,setOpen]=useState(false);
     const[rating,setRating]=useState(0);
     const[comment,setComment]=useState(" ");
     const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth<600?20:25,
        value:product.rating,
        isHalf:true
    };
const submitReviewToggle=()=>{
    setOpen(open?false:true);
}

const reviewSubmitHandler=()=>{
    const myForm = new FormData();

    myForm.set("rating",rating);
    myForm.set("comments",comment);
    myForm.set("productId",match.params.id);

    dispatch(createProductReview(myForm));
    setOpen(false);
    
}
    const addToCart=()=>{
        dispatch(addItemsToCart(match.params.id,quantity));
        alert.success("item added to cart");
    }
    const increaseCount=()=>{
        if(quantity<product.Stock)
        {
        const count =quantity+1;
        setQuantity(count);
        }

        
    }

    const decreaseCount=()=>{
        if(quantity>1)
        {
        
        const count =quantity-1;
        setQuantity(count);
        }

        
    }
      useEffect(()=>{
        dispatch(getProductDetails(match.params.id));
        if(review===true)
        {
            alert.success("review added successfully");
            dispatch({type:"NEW_REVIEW_RESET"});
          
        }
        if(error)
        {
            alert.error(""+error);
        }

        },[dispatch,match.params.id,review,alert,error]);



  return (

    <Fragment>
        {loading?<Loader/>:  <Fragment>
    
   
        {product && <Fragment>
        <MetaData title={`${product.name}`}/>
    <div className="ProductDetails" >
         <div>
         {/* <Carousel >
             
         </Carousel> */}
            <Carousel showThumbs={false}>
    
      {product.images &&
               product.images.map((item,i)=>{
                   return (
                    <div className='magnify-container'>
                       <img 
                           className="CarouselImage magnify-image"
                           key={item.url}
                           src={item.url}
                           alt={i}
                          
                           />
                           </div>
                   );
             })}
      
     
    </Carousel>
         </div>
         
         <div>
          <div className='detailsBlock-1'>
             <h2>{product.name}</h2>
             {/* <p>product # {product._id}</p> */}

         </div>
        
        
         <div className='detailsBlock-4 '>
<p>
             Description:-<p>{product.description} The surge in the app economy in India can be attributed to the interplay of various forces of demand and supply. On the demand side, factors such as the widespread adoption of smartphones, increased internet penetration (mentioned as 400 million internet users in both urban and rural areas), and a rising tech-friendly culture contribute to a growing demand for mobile apps.
    
    The surge in the app economy in India can be attributed to the interplay of various forces of demand and supply. On the demand side, factors such as the widespread adoption of smartphones, increased internet penetration (mentioned as 400 million internet users in both urban and rural areas), and a rising tech-friendly culture contribute to a growing demand for mobile apps. </p>
    </p>  </div>
         {/* <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button> */}
            </div>
          </div>

     


     </Fragment>
     }
 </Fragment>}
    </Fragment>
      
  )
}

export default ProductDetails;


