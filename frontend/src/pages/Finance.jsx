import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../contexts/AuthContext";
import { AllStudents, Loader } from "../components";
import "../styles/External.css";
import axios from "axios";

const Finance = () => {
  const { userOne } = useContext(AuthContext);
  const [semester, setSemester] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [clicked, setClicked] = useState(false);

  const handleSearch = () => {};

  const handleClick = () => {
    setClicked(true);
  };

  const checkPaymentStatus = async () => {
    setPaymentStatus(false);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/advising-panels/check-payment-status`,
        {
          headers: { "x-auth-token": token },
          params: { student: userOne._id, semester: semester },
        }
      );
      if (response.status === 200) {
        // alert(response.data);
        if (response.data !== null) {
          setPaymentStatus(response.data);
        } else {
          setPaymentStatus({ paymentStatus: "unpaid" });
        }
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setTimeout(() => setPaymentStatus(null), 2000);
    }
  };

  return (
    <div className={`finance-container ${clicked ? "blur" : ""}`}>
      {clicked && (
        <div
          className={
            clicked ? "haveClash-container active" : "haveClash-container"
          }
        >
          <div className="clash-cancel-button">
            <FontAwesomeIcon
              icon={faXmark}
              className="fa-Xmark-btn"
              onClick={() => setClicked(false)}
            />
          </div>
          <div className="clash-text-holder">
            <span className="clash-text">
              Under Maintainance. You may try later..
            </span>
          </div>
        </div>
      )}
      <div className="finance-inner-container">
        {userOne.status === "student" && (
          <>
            <div className="finance-payment-status">
              <span className="finance-payment-status-title">
                Check Payment Status:
              </span>
              <div className="finance-payment-status-form">
                <select
                  name="selectSemester"
                  id="selectSemester"
                  className="selectSemester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="">Select Semester</option>
                  <option value="Summer2024">Summer2024</option>
                  <option value="Fall2024">Fall2024</option>
                  <option value="Spring2025">Spring2025</option>
                </select>
                <button
                  type="button"
                  className="finance-payment-status-btn"
                  onClick={checkPaymentStatus}
                >
                  Check Status
                </button>
              </div>
              <div
                className={
                  paymentStatus
                    ? "finance-payment-status-popup active"
                    : "finance-payment-status-popup"
                }
              >
                {paymentStatus?.paymentStatus === "paid" && (
                  <>
                    {" "}
                    <div className="finance-payment-paid">
                      <FontAwesomeIcon icon={faCheck} className="paid-check" />
                      <span>Paid</span>
                    </div>
                  </>
                )}
                {paymentStatus?.paymentStatus === "unpaid" && (
                  <>
                    {" "}
                    <div className="finance-payment-unpaid">
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="unpaid-check"
                      />
                      <span>Unpaid</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="finance-payment-slip-form">
              <span className="finance-payment-status-title">
                Payment Slip:
              </span>
              <div className="finance-payment-semester-bank">
                <select
                  name="selectPaymentSemester"
                  id="selectPaymentSemester"
                  className="selectPaymentSemester"
                >
                  <option value="">Select Semester</option>
                  <option value="summer2024">Summer2024</option>
                  <option value="fall2024">Fall2024</option>
                  <option value="spring2025">Spring2025</option>
                </select>
                <select
                  name="selectBank"
                  id="selectBank"
                  className="selectBank"
                >
                  <option value="">Select Bank</option>
                  <option value="brac">Brac Bank Ltd</option>
                  <option value="one">One Bank Ltd</option>
                </select>
              </div>
              <div className="finance-payment-bank-online-btns">
                <button
                  type="button"
                  className="download-slip-btn"
                  onClick={handleClick}
                >
                  Download Slip
                </button>
                <button
                  type="button"
                  className="digital-pay-btn"
                  onClick={handleClick}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </>
        )}
        {userOne.status === "admin" && (
          <>
            <AllStudents />
          </>
        )}
      </div>
    </div>
  );
};

export default Finance;
