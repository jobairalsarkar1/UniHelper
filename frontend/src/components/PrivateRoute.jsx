import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Loader } from "../components";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);
  console.log(loading);
  if (loading) {
    return <Loader />;
  }
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
