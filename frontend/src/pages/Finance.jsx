import { useState } from "react";
import "../styles/External.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const Finance = () => {
  const [paymentStatus, setPaymentStatus] = useState();
  const [paid, setPaid] = useState(false);
  const [unPaid, setUnPaid] = useState(true);
  const [clicked, setClicked] = useState(false);

  const handleSearch = () => {};
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="finance-container">
      <div className="finance-inner-container">
        <div className="finance-payment-status">
          <span className="finance-payment-status-title">
            Check Payment Status:
          </span>
          <div className="finance-payment-status-form">
            <select
              name="selectSemester"
              id="selectSemester"
              className="selectSemester"
            >
              <option value="">Select Semester</option>
              <option value="summer2024">Summer2024</option>
              <option value="fall2024">Fall2024</option>
              <option value="spring2025">Spring2025</option>
            </select>
            <button
              type="button"
              className="finance-payment-status-btn"
              onClick={handleClick}
            >
              Check Status
            </button>
          </div>
          <div
            className={
              clicked
                ? "finance-payment-status-popup active"
                : "finance-payment-status-popup"
            }
          >
            {paid && (
              <>
                {" "}
                <div className="finance-payment-paid">
                  <FontAwesomeIcon icon={faCheck} className="paid-check" />
                  <span>Paid</span>
                </div>
              </>
            )}
            {unPaid && (
              <>
                {" "}
                <div className="finance-payment-unpaid">
                  <FontAwesomeIcon icon={faXmark} className="unpaid-check" />
                  <span>Unpaid</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="finance-payment-slip-form">
          <span className="finance-payment-status-title">Payment Slip:</span>
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
            <select name="selectBank" id="selectBank" className="selectBank">
              <option value="">Select Bank</option>
              <option value="brac">Brac Bank Ltd</option>
              <option value="one">One Bank Ltd</option>
            </select>
          </div>
          <div className="finance-payment-bank-online-btns">
            <button type="button" className="download-slip-btn">
              Download Slip
            </button>
            <button type="button" className="digital-pay-btn">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
