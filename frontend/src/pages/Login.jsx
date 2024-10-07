import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Footer, FormInput } from "../components";
import Vector from "../assets/Vector.jpg";
import Unihelper from "../assets/Unihelper.svg";
import "../styles/Authentication.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { email, password } = formData;

  useEffect(() => {
    if (isLoggedIn) {
      const redirectTo = location.state?.from?.pathname || "/profile";
      navigate(redirectTo);
    }
  }, [isLoggedIn, navigate, location]);

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
      // setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="authentication-container">
      <div className="authentication-inner-container">
        <div className="login-container">
          <div className="login-featuring-image">
            <img src={Vector} alt="Loading.." className="login-feature-image" />
          </div>

          <form onSubmit={onSubmit} className="login-form">
            <span className="login-form-title">Sign In</span>
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
            <FormInput
              type="text"
              name="email"
              className="form-email-field"
              value={email}
              onChange={onChange}
              placeholder="Enter Email"
              required
            />
            <FormInput
              type="password"
              name="password"
              className="form-password-field"
              value={password}
              onChange={onChange}
              placeholder="Enter Password"
              required
            />

            {/* <input
            type="text"
            name="email"
            className="form-email-field"
            value={email}
            onChange={onChange}
            placeholder="Enter Email"
            required
          /> */}
            {/* <input
            type="password"
            name="password"
            className="form-password-field"
            value={password}
            onChange={onChange}
            placeholder="Enter Password"
            required
          /> */}
            {/* {error && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.8rem",
                  marginBottom: "0px",
                  paddingBottom: "0px",
                }}
              >
                {error}
              </p>
            )} */}
            <button type="submit" className="form-login-button">
              Login
            </button>
            <p className="forget-password-reminder">
              Don't have an account?{" "}
              <Link to="/register" className="register-link">
                Register Now.
              </Link>
            </p>
            <Link to="/forget-password" className="forgot-password">
              Forgot Password?
            </Link>
          </form>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
