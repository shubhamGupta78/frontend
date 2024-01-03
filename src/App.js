import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/layouts/Header/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./components/layouts/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignup from "./components/User/LoginSignup";
import Store from "./Store";
import { loadData } from "./actions/userAction";
import UserOptions from "./components/layouts/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile"
import UpdatePassword from "./components/User/UpdatePassword";
import ProtectedRoute from "./Route/ProtectedRoute";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping"
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UserList from "./components/Admin/UserList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
// import ProtectedRoute from "./component/Route/ProtectedRoute";
// import UpdateProfile from "./component/User/UpdateProfile";
// import UpdatePassword from "./component/User/UpdatePassword";
// import ForgotPassword from "./component/User/ForgotPassword";
// import ResetPassword from "./component/User/ResetPassword";
// import Cart from "./component/Cart/Cart";
// import Shipping from "./component/Cart/Shipping";
// import ConfirmOrder from "./component/Cart/ConfirmOrder";
// import axios from "axios";
// import Payment from "./component/Cart/Payment";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import OrderSuccess from "./component/Cart/OrderSuccess";
// import MyOrders from "./component/Order/MyOrders";
// import OrderDetails from "./component/Order/OrderDetails";
// import Dashboard from "./component/Admin/Dashboard.js";
// import ProductList from "./component/Admin/ProductList.js";
// import NewProduct from "./component/Admin/NewProduct";
// import UpdateProduct from "./component/Admin/UpdateProduct";
// import OrderList from "./component/Admin/OrderList";
// import ProcessOrder from "./component/Admin/ProcessOrder";
// import UsersList from "./component/Admin/UsersList";
// import UpdateUser from "./component/Admin/UpdateUser";
// import ProductReviews from "./component/Admin/ProductReviews";
// import Contact from "./component/layout/Contact/Contact";
// import About from "./component/layout/About/About";
// import NotFound from "./component/layout/Not Found/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey,setStripeApiKey]=useState(" ");
  
  async function getStripeApiKey()
  {

    const config = { headers: { "Content-Type": "application/json" },
    // credentials: 'include', 
     withCredentials: true 
};
    const {data}=await axios.get('http://localhost:5500/api/vi/stripeapikey',config);
 
    setStripeApiKey(data.stripeApiKey);
  }
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
   
    Store.dispatch(loadData());
    
    getStripeApiKey();
    console.log(stripeApiKey);

  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}


      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/account" component={Profile} />
        <Route exact path="/search" component={Search} />
        <ProtectedRoute exact path="/me/update"  component={UpdateProfile}/>
        <ProtectedRoute exact path="/password/update"  component={UpdatePassword}/>
    <Route exact path="/password/forgot"  component={ForgotPassword}/>
    <Route exact path="/password/reset/:token"  component={ResetPassword}/>
       <Route exact path="/cart" component={Cart}/>

        <Route exact path="/login" component={LoginSignup} />

        <ProtectedRoute exact path="/checkout" component={Shipping}/>

 <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>
 <ProtectedRoute exact path="/success" component={OrderSuccess}/>
       <ProtectedRoute exact path="/orders" component={MyOrders}/>
       <ProtectedRoute exact path="/order/:id" component={OrderDetails}/>

       <ProtectedRoute 
          isAdmin={true}  
          exact path="/admin/dashboard"  
          component={Dashboard}
          />
       <ProtectedRoute 
          isAdmin={true}  
          exact path="/admin/products"  
          component={ProductList}
          />

<ProtectedRoute 
          isAdmin={true}  
          exact path="/admin/product/"  
          component={NewProduct}
          />

<ProtectedRoute 
          isAdmin={true}  
          exact path="/admin/product/update/:id"  
          component={UpdateProduct}
          />

<ProtectedRoute 
          isAdmin={true}  
          exact path="/admin/orders/"  
          component={OrderList}
          />
<ProtectedRoute 
          isAdmin={true}  
          exact path="/admin/order/update/:id"  
          component={ProcessOrder}
          />

<ProtectedRoute 
          isAdmin={true}  
          exact path="/admin/users/"  
          component={UserList}
          />

<ProtectedRoute 
          isAdmin={true}  
          exact path="/admin/user/update/:id"  
          component={UpdateUser}
          />

<ProtectedRoute 
          isAdmin={true}  
          exact path="/admin/reviews/"  
          component={ProductReviews}
          />
   {
     stripeApiKey &&      
     <Elements stripe={loadStripe(stripeApiKey)}>
  <ProtectedRoute exact path="/process/payment" component={Payment}/>   
  </Elements>
         
   }
          
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;