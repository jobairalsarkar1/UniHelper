import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userOne, setUserOne] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get(
            "http://localhost:5000/api/users/profile",
            {
              headers: { "x-auth-token": token },
            }
          );
          setIsLoggedIn(true);
          setUserOne(res.data);
          setTokens(token);
        } catch (err) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setUserOne(null);
        }
      }
      setLoading(false);
    };
    checkLogin();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setTokens(res.data.token);

      const userProfile = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: { "x-auth-token": res.data.token },
        }
      );
      setIsLoggedIn(true);
      setUserOne(userProfile.data);
      // setUserOne(res.data.user);
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserOne(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userOne, login, logout, loading, tokens }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
