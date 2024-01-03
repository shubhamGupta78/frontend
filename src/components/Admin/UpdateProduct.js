import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProductRequest,getProductDetails} from "../../actions/adminActions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import Loader from '../layouts/Loader/Loader'
import {  ADMIN_UPDATE_PRODUCT_RESET} from "../../constants/adminConstants";
import axios from 'axios';

// const cloudinary = new Cloudinary({
//   cloud_name: 'dixmd9xpj', // Replace with your Cloudinary cloud name
//   secure: true, // Use HTTPS
// });


const UpdateProduct = ({history,match}) => {
    const alert=useAlert();
    const dispatch=useDispatch();
const {product,success,loading,error}=useSelector(state=>state.modifyProduct);
const {productDetails,isUpdated,error:updatedError,loadings}=useSelector(state=>state.updateProduct);
console.log("success value is"+success);



const [name, setName] = useState("");
const [price, setPrice] = useState(0);
const [description, setDescription] = useState("");
const [category, setCategory] = useState("");
const [Stock, setStock] = useState(0);
const [images, setImages] = useState([]);
const [oldImages, setOldImages] = useState([]);
const [imagesPreview, setImagesPreview] = useState([]);

    const updateProductSubmitHandler= async(e)=>{
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price",price);
        myForm.set("description",description);
        myForm.set("category", category);
    myForm.set("Stock", Stock);

    for (let i = 0; i < images.length; i++) {
        myForm.append('images', images[i]);
      }
    
      
dispatch(updateProductRequest(match.params.id,myForm));
    }





    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to an array
      
        setOldImages([]);
        setImages([]);
        setImagesPreview([]);
      
        files.forEach((file) => {
          const reader = new FileReader();
      
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
      
          reader.readAsDataURL(file);
        });
      };
     
      
      
      
      
      
      
  const categories=["laptop"];



  useEffect(()=>{

    if(error)
    {
        alert.error(""+error)
        dispatch(clearErrors());
    }

    if(!product || product._id !== match.params.id)
    {
        dispatch(getProductDetails(match.params.id));
    }
   else{
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
   }
   if(isUpdated){
   alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: ADMIN_UPDATE_PRODUCT_RESET });
   }
    

  },[dispatch,
    history,
    match.params.id,
    product,
    alert,
    error,
    isUpdated
]);

  return (
      <Fragment>
   {loading?<Loader/>:  <Fragment>
   <MetaData title="Update Product" />
   <div className="dashboard">
     <SideBar />
     <div className="newProductContainer">
       <form
         className="createProductForm"
         encType="multipart/form-data"
         onSubmit={updateProductSubmitHandler}
       >
         <h1>Create Product</h1>

         <div>
           <SpellcheckIcon />
           <input
             type="text"
             placeholder="Product Name"
             required
             value={name}
             onChange={(e) => setName(e.target.value)}
           />
         </div>
         <div>
           <AttachMoneyIcon />
           <input
             type="number"
             placeholder="Price"
             required
             value={price}
             onChange={(e) => setPrice(e.target.value)}
           />
         </div>

         <div>
           <DescriptionIcon />

           <textarea
             placeholder="Product Description"
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             cols="30"
             rows="1"
           ></textarea>
         </div>

         <div>
           <AccountTreeIcon />
           <select value={category} onChange={(e) => setCategory(e.target.value)}>
             <option value="">Choose Category</option>
             {categories.map((cate) => (
               <option key={cate} value={cate}>
                 {cate}
               </option>
             ))}
           </select>
         </div>

         <div>
           <StorageIcon />
           <input
             type="number"
             placeholder="Stock"
             required
             value={Stock}
             onChange={(e) => setStock(e.target.value)}
           />
         </div>

         <div id="createProductFormFile">
           <input
             type="file"
             name="avatar"
             accept="image/*"
             onChange={updateProductImagesChange}
            
           />
         </div>

         <div id="createProductFormImage">
             {oldImages &&
               oldImages.map((image, index) => (
                 <img key={index} src={image.url} alt="Old Product Preview" />
               ))}
           </div>

           <div id="createProductFormImage">
             {imagesPreview.map((image, index) => (
               <img key={index} src={image} alt="Product Preview" />
             ))}
           </div>

         <Button
           id="createProductBtn"
           type="submit"
           disabled={loading ? true : false}
         >
          Update Product
         </Button>
       </form>
     </div>
   </div>
 </Fragment>
 }
 </Fragment>
  )
}

export default UpdateProduct
