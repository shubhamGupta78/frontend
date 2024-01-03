import React from 'react'
import ReactStars from 'react-rating-stars-component'
import {Link} from 'react-router-dom'
import "./Home.css"

const ProductCard = ({product}) => {
    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth<600?20:25,
        value:product.rating,
        isHalf:true
    };
 
  return (

   
      <Link className="productCard" to={`product/${product._id}`}>
          <img src={product.images[0].url} alt="shubh"  />
          <p>{product.name}</p>
          <ReactStars {...options}/><span>{product.numberOfReviews} Reviews</span>
          <span>{product.price}</span>

      </Link>
    
  );
}

export default ProductCard
