import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  allUsersRequest,
  deleteUserRequest
} from "../../actions/adminActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { ADMIN_DELETE_USER_RESET } from "../../constants/adminConstants";
import "./productList.css"
const ProductList = () => {

    const dispatch=useDispatch();
    const alert=useAlert();

    const {users,error,loading}=useSelector(state=>state.getUsers);
    const{isDeletedUser}=useSelector(state=>state.deleteUser);
    console.log("value of isDeleted"+isDeletedUser);
console.log("value of products is"+users.length);
console.log("value of loading"+loading);
    const deleteUserHandler=(productId)=>{

        dispatch(deleteUserRequest(productId));
        

    }

    useEffect(()=>{
            dispatch(allUsersRequest());

            if(error)
            {
                alert.error(""+error);
                dispatch(clearErrors());
            }
            if (isDeletedUser===true ) {
                alert.success("user deleted successfully");
                dispatch({ type: ADMIN_DELETE_USER_RESET });
            }
                // Reset isDeleted to false when component unmounts or on page refresh
                return () => {
                    dispatch({ type: ADMIN_DELETE_USER_RESET });
                };
    },[dispatch,alert,error,isDeletedUser,loading])

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 350,
          flex: 1,
        },
        {
          field: "email",
          headerName: "Email",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "role",
          headerName: "Role",
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
                <Link to={`/admin/user/update/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteUserHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];

      const rows = Array.isArray(users)
    ? users.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      }))
    : [];

console.log(rows);
          
  return (
    <Fragment>
    <MetaData title={`ALL USERS - Admin`} />

    <div className="dashboard">
      <SideBar />
      <div className="productListContainer">
        <h1 id="productListHeading">ALL USERS</h1>

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
