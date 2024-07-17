import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import "../styles/Authentication.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="authentication-container">
      <div className="register-container">
        <div className="register-featuring-image">
          <img src="logo.png" alt="Logo" className="feature-image" />
        </div>

        <form className="register-form">
          <span className="register-form-title">Sign Up</span>
          <input
            type="text"
            className="form-email-field"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter Full Name"
            required
          />
          <input
            type="email"
            className="form-email-field"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter Email"
            required
          />
          <input
            type="password"
            className="form-password-field"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter Password"
            required
          />
          <input
            type="password"
            className="form-password-field"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password"
            required
          />
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
          <button type="submit" className="form-login-button">
            Sign Up
          </button>
          <p className="forget-password-reminder">
            Already have an account?{" "}
            <Link to="/login" className="register-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
