import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/Authentication.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="authentication-container">
      <div className="login-container">
        <div className="login-featuring-image">
          <img src="logo.png" alt="Loading.." className="feature-image" />
        </div>

        <form onSubmit={onSubmit} className="login-form">
          <span className="login-form-title">Sign In</span>
          <input
            type="text"
            name="email"
            className="form-email-field"
            value={email}
            onChange={onChange}
            placeholder="Enter Email"
            required
          />
          <input
            type="password"
            name="password"
            className="form-password-field"
            value={password}
            onChange={onChange}
            placeholder="Enter Password"
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="form-login-button">
            Login
          </button>
          <p className="forget-password-reminder">
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              Register Now.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
