import React, { Fragment, useEffect, useState } from 'react'
import "./Cart.css";
import {useSelector,useDispatch } from 'react-redux';
import CartItemCard from "./CartItemCard"
import { addItemsToCart,removeItemsFromCart,saveShippingInfo } from '../../actions/cartActions';
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";


const Cart = ({history}) => {
    const dispatch=useDispatch();
    let total=0;
   const {cartItems}=useSelector((state)=>state.cart)

   console.log(cartItems);

   const checkOutHandler=()=>{
       history.push('/login?redirect=checkout')
   }
   
const increaseCount= (id, quantity, stock) => {
    console.log("dflkjhdfgs");
    const newQty = quantity + 1;
    console.log(id);
    console.log(quantity);
    console.log(stock);
    console.log(newQty);
    if (newQty<=stock) {
        dispatch(addItemsToCart(id, newQty));
    }
   
  };

  const calculateTotal=()=>{
    for (const item of cartItems) {
        total += (item.price*item.quantity);
      }
      return total;
  }

  const decreaseCount = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty>=1) {
        dispatch(addItemsToCart(id, newQty));
    }
    
  };

  const deleteCartItems=(id)=>{
      dispatch(removeItemsFromCart(id));
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseCount(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseCount(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Cart

