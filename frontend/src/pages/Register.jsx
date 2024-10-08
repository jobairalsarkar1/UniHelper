import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import registerImage from "../assets/Vector.jpg";
import "../styles/Authentication.css";
import { Footer } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ID: "",
    password: "",
    // confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const { name, email, ID, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        ID,
        password,
      });
      if (res.data) {
        setSuccess(res.data?.message);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something Went wrong.");
      // setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="authentication-container">
      <div className="authentication-inner-container">
        <div className="register-container">
          <div className="register-featuring-image">
            <img
              src={registerImage}
              alt="Logo"
              className="register-feature-image"
            />
          </div>

          <form onSubmit={onSubmit} className="register-form">
            <span className="register-form-title">Sign Up</span>
            {error && (
              <>
                <div className="submition-response-message error-one">
                  <p>{error}</p>
                  <FontAwesomeIcon
                    icon={faClose}
                    className="close-comment-icon"
                    onClick={() => setError("")}
                  />
                </div>
              </>
            )}
            {success && (
              <>
                <div className="submition-response-message sucess-one">
                  <p>{success}</p>
                  <FontAwesomeIcon
                    icon={faClose}
                    className="close-comment-icon"
                    onClick={() => setSuccess("")}
                  />
                </div>
              </>
            )}
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
            {/* {error && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.8rem ",
                  marginBottom: "0px",
                  paddingBottom: "0px",
                }}
              >
                {error}
              </p>
            )} */}
            {/* {success && (
              <p
                style={{
                  color: "green",
                  fontSize: "0.8rem",
                  marginBottom: "0px",
                  paddingBottom: "0px",
                }}
              >
                Registration was Successfull.
              </p>
            )} */}
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
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Register;
