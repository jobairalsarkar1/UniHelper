import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [ID, setID] = useState("");
  const [message, setMessage] = useState("");
  const [messageEr, setMessageEr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://unihelper.onrender.com/api/users/forget-password", {
        email,
        ID,
      });
      if (response.status === 200) {
        setMessage(response.data?.message);
      }
    } catch (error) {
      setMessageEr(error.response?.data?.message);
    }

    setLoading(false);
  };

  return (
    <div className="authProblem-container">
      <div className="authProblem-inner-container">
        <div className="forget-password-request-from">
          <span className="forget-password-title">Forgot Password!!!</span>
          {message && (
            <>
              <div className="submition-response-message sucess-one">
                <p>{message}</p>
                <FontAwesomeIcon
                  icon={faClose}
                  className="close-comment-icon"
                  onClick={() => setMessage("")}
                />
              </div>
            </>
          )}
          {messageEr && (
            <>
              <div className="submition-response-message error-one">
                <p>{messageEr}</p>
                <FontAwesomeIcon
                  icon={faClose}
                  className="close-comment-icon"
                  onClick={() => setMessageEr("")}
                />
              </div>
            </>
          )}
          <div className="forget-password-input">
            <label htmlFor="email">Enter Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
            />
          </div>

          <div className="forget-password-input">
            <label htmlFor="ID">Enter ID:</label>
            <input
              type="number"
              name="ID"
              id="ID"
              value={ID}
              onChange={(e) => setID(e.target.value)}
              placeholder="21201175"
            />
          </div>

          <button
            type="button"
            className="forget-password-btn"
            onClick={handleSubmit}
          >
            {loading ? "Processing" : "Forget Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
