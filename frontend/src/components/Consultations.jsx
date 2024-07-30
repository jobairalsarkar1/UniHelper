import React from "react";
import "../styles/Consultations.css";

const Consultations = () => {
  return (
    <>
      <div className="consultations-container">
        <form className="consultation-request-form">
          <span>Make Consultation Request</span>
          <input
            type="text"
            className="consultation-reason-input"
            placeholder="Enter your Consultation Reason"
            required
          />
          <div className="consultation-others-container">
            <select
              name="JMA"
              id="select-faculty"
              className="select-faculty"
              required
            >
              <option value="JMA">Jawaril MunShad Abbedin</option>
              <option value="MSD">Madhumonty Sreya Das</option>
              <option value="ASA">Dr. Ashraful Alam</option>
            </select>
            <input
              type="datetime-local"
              className="consultation-time"
              required
            />
            <button type="submit" className="consultation-request-btn">
              Make Request
            </button>
          </div>
        </form>
        <div className="approved-consultation-request">
          <span className="approved-requests">Approved Requests</span>
          <hr />
        </div>
        <div className="pending-counsultation-request">
          <span className="pending-requests">Pending Requests</span>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Consultations;
