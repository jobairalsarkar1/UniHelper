import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userStatus, setUserStatus] = useState(null);
  const [userOne, setUserOne] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("/api/users/profile", {
            headers: { "x-auth-token": token },
          });
          setIsLoggedIn(true);
          // setUserStatus(res.data.status);
          setUserOne(res.data);
        } catch (err) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setUserOne(null);
        }
      }
    };
    checkLogin();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      setUserOne(res.data.user);
      // setUserStatus(res.data.user.status);
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // setUserStatus(null);
    setUserOne(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userOne, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
