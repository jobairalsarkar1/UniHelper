import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "../components";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);
  const location = useLocation();

  // console.log(loading);
  if (loading) {
    return (
      <div className="loader-container-actual1">
        <Loader />
      </div>
    );
  }
  // return isLoggedIn ? children : <Navigate to="/login" />;
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
