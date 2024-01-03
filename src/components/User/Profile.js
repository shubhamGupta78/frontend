import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import profilePng from "../../images/Profile.png";
import { useHistory } from 'react-router-dom'; 

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const history=useHistory();
  useEffect(() => {
      console.log("value of is authenticated"+isAuthenticated)
    if (!isAuthenticated) {
      history.push("/login");
    }

    console.log("hi shubh");
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : user ? (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              {user.avatar ? (
  <img src={user.avatar.url} alt="My Profile" />
) : (
  <img src={profilePng} alt="Default Profile" />
)}
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      ):null}
    </Fragment>
  );
};

export default Profile;