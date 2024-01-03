import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar.js"
import "./dashboard.css"
import { Typography } from '@material-ui/core'
import {Link} from "react-router-dom"
import {Doughnut,Line} from 'react-chartjs-2'
import { CategoryScale, Chart ,LinearScale,PointElement,LineElement,ArcElement} from "chart.js";
import { useAlert } from "react-alert";
import {
    clearErrors,
    getProduct,
  } from "../../actions/adminActions";

  import {
 
    allUsersRequest
  } from "../../actions/adminActions";

  import {
    
    allOrdersRequest
  } from "../../actions/adminActions";


const Dashboard = () => {
    const alert=useAlert();
    const dispatch=useDispatch();
    const {products,error,loading,}=useSelector(state=>state.adminProducts);
    const {orders,totalAmount}=useSelector(state=>state.adminOrders);
    const {users}=useSelector(state=>state.getUsers);

  let outOfStock=0;


    Array.isArray(products) && products.forEach((item) => {
       
        if(item.Stock<1)
        {

            outOfStock++;
        }
    })

console.log("value of"+outOfStock);


    Chart.register(CategoryScale);
    Chart.register(LinearScale);
    Chart.register(PointElement);
    Chart.register(LineElement);
    Chart.register(ArcElement);
    const lineState = {
        labels: ["initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["TOMATO"],
            hoverBackgroundColor: ["rgb(197,72,40)"], // Add a closing parenthesis here
            data: [0, 4000],
          },
        ],
      };

      const doughnutState={
          labels:["Out of Stock","InStock"],
          datasets:[{
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
          }]
      }
      
    useEffect(()=>{
        if(error)
        {
            alert.error(""+error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
        dispatch(allOrdersRequest());
        dispatch(allUsersRequest());
    },[dispatch,error,alert]);
      
      return (
        <div className='dashboard'>
          <Sidebar />
          <div className='dashboardContainer'>
            <Typography component="h1">Dashboard</Typography>
            <div className='dashboardSummary'>
              <div>
                <p>
                  Total Amount <br />{totalAmount}
                </p>
              </div>
              <div className='dashboardSummaryBox2'>
                <Link to='/admin/products'>
                  <p>Product</p>
                  <p>{products.length}</p>
                </Link>
                <Link to='/admin/orders'>
                  <p>Orders</p>
                  <p>{orders.length}</p>
                </Link>
                <Link to='/admin/users'>
                  <p>Users</p>
                  <p>{users.length}</p>
                </Link>
              </div>
            </div>
            <div className='lineChart'>
              <Line data={lineState}  /> {/* Include the options here */}
            </div>
            <div className='doughnutChart'>
              <Doughnut data={doughnutState}  /> {/* Include the options here */}
            </div>
          </div>
        </div>
      );
      
}

export default Dashboard

