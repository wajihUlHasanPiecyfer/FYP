import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { Loader } from "../layout/Loader/Loader";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (loading) {
    <Loader />
    return null;
  }
  if(!isAuthenticated){
    return <Navigate to={"/login"} />
  }

  if(isAdmin === true && user.role !== "admin"){
    return <Navigate to={"/"} />
  }
return children ? children : <Outlet />

};

export default ProtectedRoute;
