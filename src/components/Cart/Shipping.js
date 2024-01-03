
import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import MetaData from "../layouts/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";
const Shipping = ({history}) => {
    const dispatch=useDispatch();
    const { shippingInfo } = useSelector((state) => state.cart);
    const countries = Country.getAllCountries();
    const alert=useAlert();
    const[address,setAddress]=useState(shippingInfo.address);
    const[city,setCity]=useState(shippingInfo.city);
    const[state,setState]=useState(shippingInfo.state);
    const[country,setCountry]=useState(shippingInfo.country);
    const[pinCode,setPinCode]=useState(shippingInfo.pinCode);
    const[phoneNo,setPhoneNo]=useState(shippingInfo.phoneNo);

    const shippingSubmit=(e)=>{
            e.preventDefault();
            if(phoneNo.length<10||phoneNo.length>10)
            {
                alert.error("phoneno should be of length 10");
            }
            else
            {
            dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo}));
            history.push('/order/confirm');
            }

    }

    const handleCountryChange=(e)=>{
            setCountry(e.target.value);
            setState('');
    }
  return (
   <Fragment>
       <MetaData title='Shipping Details'/>
       <CheckoutSteps activeStep={0}/>
       <div className="shippingContainer">
           <div className="shipBox">
               <h2 className="shippingHeading">
                    Shipping Details
               </h2>
               <form
                className="shippingForm"
                encType="multipart/form-data"
                onSubmit={shippingSubmit}
              >
                <div >
                  <HomeIcon />
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    name="name"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                  />
                </div>
                <div >
                  <LocationCityIcon />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    name="city"
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                  />
                </div>
                

                <div >
                  <PinDropIcon />
                  <input
                    type="number"
                    placeholder="Pin Code"
                    required
                    name="pincode"
                    value={pinCode}
                    onChange={(e)=>setPinCode(e.target.value)}
                  />
                </div>

                <div >
                  <PhoneIcon />
                  <input
                    type="number"
                    placeholder="PhoneNo"
                    required
                    name="phoneno"
                    value={phoneNo}
                    onChange={(e)=>setPhoneNo(e.target.value)}
                  />
                </div>

                <div >
                  <PublicIcon />
                  <select
                    
                    required
                    name="country"
                    value={country}
                    onChange={handleCountryChange}
                  >
                      <option value="" >Country</option>
                      {countries.map((i)=>{
                          return(
                          <option key={i.isoCode} value={i.isoCode}>{i.name}</option>

                      )})}
                      </select>
                </div>
                {country && <div >
                        <TransferWithinAStationIcon/>

                    <select
                    required
                    value={state}
                    name={state}
                    onChange={(e)=>setState(e.target.value)}
                    >
                        <option value="">State</option>
                        
                            {State&&State.getStatesOfCountry(country).map((i)=>{
                                return(
                                    <option key={i.isoCode} value={i.isoCode}>{i.name}</option>
                                )

                            })}

                    </select>
                    </div>
                    }

                <input type="submit" value="Continue" className="shippingBtn" />
              </form>
           </div>

       </div>
   </Fragment>
  )
}

export default Shipping
