import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Authentication.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ID: "",
    password: "",
    // confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { name, email, ID, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/users/register", {
        name,
        email,
        ID,
        password,
      });
      if (res.data) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something Went wrong.");
    }
  };

  return (
    <div className="authentication-container">
      <div className="register-container">
        <div className="register-featuring-image">
          <img src="logo.png" alt="Logo" className="feature-image" />
        </div>

        <form onSubmit={onSubmit} className="register-form">
          <span className="register-form-title">Sign Up</span>
          <input
            type="text"
            className="form-name-field"
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
            type="number"
            className="form-ID-field"
            name="ID"
            value={ID}
            onChange={onChange}
            placeholder="Enter ID"
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
          {/* <input
            type="password"
            className="form-password-field"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password"
            required
          /> */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && (
            <p style={{ color: "green" }}>Registration was Successfull.</p>
          )}
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
