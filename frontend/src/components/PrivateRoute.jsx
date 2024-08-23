import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? component : <Navigate to="/login" />;
};

export default PrivateRoute;
