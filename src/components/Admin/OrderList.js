import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  allOrdersRequest,
  deleteOrderRequest
} from "../../actions/adminActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { ADMIN_DELETE_ORDER_RESET } from "../../constants/adminConstants";
import "./productList.css"
const ProductList = () => {

    const dispatch=useDispatch();
    const alert=useAlert();

    const {orders,totalAmount,error,loading}=useSelector(state=>state.adminOrders);
    const{isOrderDeleted}=useSelector(state=>state.deleteOrder);
console.log("value of products is"+orders);
console.log("value of loading"+loading);
    const deleteProductHandler=(OrderId)=>{

        dispatch(deleteOrderRequest(OrderId));
        

    }

    useEffect(()=>{
            dispatch(allOrdersRequest());

            if(error)
            {
                alert.error(""+error);
                dispatch(clearErrors());
            }
            if (isOrderDeleted===true ) {
                alert.success("order deleted successfully");
                dispatch({ type: ADMIN_DELETE_ORDER_RESET });
            }
                // Reset isDeleted to false when component unmounts or on page refresh
                return () => {
                    dispatch({ type: ADMIN_DELETE_ORDER_RESET});
                };
    },[dispatch,alert,error,isOrderDeleted,loading])

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
                <Fragment>
                  <Link to={`/admin/order/update/${params.getValue(params.id, "id")}`}>
                    <EditIcon />
                  </Link>
      
                  <Button
                    onClick={() =>
                      deleteProductHandler(params.getValue(params.id, "id"))
                    }
                  >
                    <DeleteIcon />
                  </Button>
                </Fragment>
              );
            },
          },
      ];
      
    
      const rows = Array.isArray(orders)
      ? orders.map((element) => ({
        id:element._id,
        status:element.orderStatus,
      itemsQty:element.orderItems.length,
      amount:element.totalPrice,
        }))
      : [];
          
  return (
    <Fragment>
    <MetaData title={`ALL PRODUCTS - Admin`} />

    <div className="dashboard">
      <SideBar />
      <div className="productListContainer">
        <h1 id="productListHeading">ALL PRODUCTS</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
      </div>
    </div>
  </Fragment>
  )
}

export default ProductList
