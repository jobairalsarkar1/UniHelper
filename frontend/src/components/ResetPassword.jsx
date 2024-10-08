import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, {
        password,
        confirmPassword,
      });
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      // alert(error.response?.data?.message || "Something went wrong.");
      setError(error.response?.data?.message);
      console.error(error.response?.data?.message);
    }
  };

  return (
    <div className="authProblem-container">
      <div className="authProblem-inner-container">
        <div className="forget-password-request-from">
          <span className="forget-password-title">Reset Password</span>
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
          <div className="forget-password-input">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>

          <div className="forget-password-input">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
            />
          </div>

          <button
            type="submit"
            className="forget-password-btn"
            onClick={resetPasswordHandler}
          >
            Forget Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
