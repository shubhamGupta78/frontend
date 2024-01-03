import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getMyOrders } from "../../actions/orderAction";
import Loader from "../layouts/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layouts/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import { Elements } from "@stripe/react-stripe-js";

const MyOrders = () => {
  const dispatch=useDispatch();
  const alert=useAlert();

  const {loading,error,orders}=useSelector((state)=>state.orders);
  const {user}=useSelector((state)=>state.user);
console.log("value of orders"+orders);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows=[];

  orders&&orders.forEach((element,index) => {

    console.log(element.orderItems.length);
    rows.push({
      id:element._id,
      status:element.orderStatus,
    itemsQty:element.orderItems.length,
    amount:element.totalPrice,
    });
  });

  useEffect(()=>{
    if(error)
    {
      alert.error(error);
      dispatch(clearErrors());

     
    }
    dispatch(getMyOrders());
  },[error])
  return (
    <Fragment>
      
      <MetaData title={`${user.name}-Order`}/>

      {loading?(<Loader/>):(
        <div className="myOrdersPage">
          <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="myOrdersTable"
          autoHeight
           />

<Typography id="myOrdersHeading">{`${user.name}`}`s</Typography>
        </div>

       
      )}
    </Fragment>
  )
}

export default MyOrders
