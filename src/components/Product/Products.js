import React,{Fragment, useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getProduct } from '../../actions/productAction'
import Loader from '../layouts/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import './Products.css'
import Pagination from 'react-js-pagination'
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const categories=[
    "Laptop",
    "Footwear",
    "Bottome",
    "Tops",
    "Attire",
    "Camera",
    "Smartphone"
];
const Products = ({match}) => {
    const [currentPage,setCurrentPage]=useState(1);
    const [price,setPrice]=useState([0,25000]);
    const [rating,setRating]=useState(0);
    const [category,setCategory]=useState("");
    const dispatch=useDispatch();
    const {products,loading,productsCount,resultPerPage,filteredProductCount}=useSelector((state)=>state.products);
    console.log(productsCount);
    console.log(resultPerPage);
    
    useEffect(() => {
        console.log()
        dispatch(getProduct(match.params.keyword,currentPage,price,category,rating));

    },[dispatch,match.params.keyword,currentPage,price,category,rating]);
    const setCurrentPageNo=(e)=>{

        setCurrentPage(e);

    };
    
    const priceHandler=(event,newPrice)=>{
        setPrice(newPrice);

    } 
    
    let count=filteredProductCount
    return (
    <Fragment>
        {loading?<Loader/>:(
            <Fragment>
                <h2 className='productsHeading'>Products</h2>
                     <div className="products" id="container">
                {products && products.map(product => 
                {
                    return(
                     <ProductCard product={product} key={product._id}/>
                    )
    })}
        

                </div>
                <div className='filterBox'>
                    <Typography Price></Typography>
                    <Slider 
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                        >

                    </Slider>
                    <Typography>Categories</Typography>
                    
                    <ul className='categoryBox'>
                        
                        {categories.map((category)=>{
                            return(
                            <li 
                            className="category-link" 
                            key={category} 
                            onClick={()=>{
                                setCategory(category)
                            }}>{category}</li>
                            )

                        })}
                    </ul>
                    <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => {
                  setRating(newRating);
                }}
                aria-labelledby="Cntinuous slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
                  

                </div>


                <div className="paginationBox">
                {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
                </div>
            </Fragment>
        )}
    </Fragment>

  )
}

export default Products
