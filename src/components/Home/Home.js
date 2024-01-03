import React, { Fragment, useEffect } from "react";
import "./Home.css";
 import ProductCard from "./ProductCard.js";
import MetaData from "../layouts/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from '../layouts/Loader/Loader'




/*const product={
    name:"shubham",
    images:["https://res.cloudinary.com/demo/image/upload/c_scale,w_500/if_ar_lt_1.0/b_auto,c_pad,h_300,w_500/if_end/ladybug_top.jpg"],
    price:3000,
    _id:"abhishek",

}*/

const Home = () => {
   
   const alert = useAlert();
  const dispatch = useDispatch();
   const { loading ,products,productCount,error } = useSelector((state) => state.products);

  useEffect(() => {
      if(error)
      {
          return alert.error("error"+error);
      }
   dispatch(getProduct());
  }, [dispatch,error,alert]);

 
  return (
   <Fragment>
       {loading ? <Loader/>:(
            <Fragment>
            <MetaData title="ushmo"/>
            <div className="banner">
          
                <div >
                <h1 className="ush">UshMo</h1>
                <div className="infoCard">
                    <br></br>
                <p>
                The surge in the app economy in India can be attributed to the interplay of various forces of demand and supply. On the demand side, factors such as the widespread adoption of smartphones, increased internet penetration (mentioned as 400 million internet users in both urban and rural areas), and a rising tech-friendly culture contribute to a growing demand for mobile apps.
    
                The surge in the app economy in India can be attributed to the interplay of various forces of demand and supply. On the demand side, factors such as the widespread adoption of smartphones, increased internet penetration (mentioned as 400 million internet users in both urban and rural areas), and a rising tech-friendly culture contribute to a growing demand for mobile apps.
Meanwhile, on the supply side, the app economy responds to this demand with frequent innovations, digital delivery of services, and a focus on customizable apps. The growth of web and mobile app developers over the past few years indicates a supply-side response to the increasing demand. Additionally, the attention and investment from leading giants, as well as initiatives like NASSCOM's 
                </p>

                </div>
                
                 </div>
            </div>
            <div className="homeHeading">
               <h1> Featured categories</h1>
            </div>
            <div className="container" id="container">
                {products&&products.map(product => 
                {
                    return(
                     <ProductCard product={product} key={product._id}/>
                    )
    })}
        
                </div>
        </Fragment>
       )}
   </Fragment>
  );
};

export default Home;
