import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("/api/users/profile", {
            headers: { "x-auth-token": token },
          });
          setIsLoggedIn(true);
          setUserStatus(res.data.status);
        } catch (err) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
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
      setUserStatus(res.data.user.status);
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserStatus(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
