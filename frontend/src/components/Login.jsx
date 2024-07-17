import React, { useState } from "react";
import "../styles/Authentication.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="authentication-container">
      <div className="login-container">
        <div className="login-featuring-image">
          <img src="logo.png" alt="Loading.." className="feature-image" />
        </div>

        <form className="login-form">
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
            type="text"
            name="password"
            className="form-password-field"
            value={password}
            onChange={onChange}
            placeholder="Enter Password"
            required
          />
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
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
