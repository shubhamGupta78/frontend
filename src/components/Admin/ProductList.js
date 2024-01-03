import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProduct,
  deleteProductRequest
} from "../../actions/adminActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { ADMIN_DELETE_PRODUCT_RESET } from "../../constants/adminConstants";
import "./productList.css"
const ProductList = () => {

    const dispatch=useDispatch();
    const alert=useAlert();

    const {products,error,loading}=useSelector(state=>state.adminProducts);
    const{isDeleted}=useSelector(state=>state.deleteProduct);
    console.log("value of isDeleted"+isDeleted);
console.log("value of products is"+products.length);
console.log("value of loading"+loading);
    const deleteProductHandler=(productId)=>{

        dispatch(deleteProductRequest(productId));
        

    }

    useEffect(()=>{
            dispatch(getProduct());

            if(error)
            {
                alert.error(""+error);
                dispatch(clearErrors());
            }
            if (isDeleted===true ) {
                alert.success("product deleted successfully");
                dispatch({ type: ADMIN_DELETE_PRODUCT_RESET });
            }
                // Reset isDeleted to false when component unmounts or on page refresh
                return () => {
                    dispatch({ type: ADMIN_DELETE_PRODUCT_RESET });
                };
    },[dispatch,alert,error,isDeleted])

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 350,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
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
                <Link to={`/admin/product/update/${params.getValue(params.id, "id")}`}>
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

      const rows = Array.isArray(products)
    ? products.map((item) => ({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      }))
    : [];

console.log(rows);
          
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
