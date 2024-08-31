import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Consultations.css";

const Consultations = () => {
  const [faculties, setFaculties] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/users/all-users", { headers: { "x-auth-token": token } })
      .then((response) => {
        setFaculties(response.data.filter((user) => user.status === "teacher"));
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <>
      <div className="consultations-container">
        <div className="consultations-inner-container">
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
                <option value="JMA">Select Faculty</option>
                {faculties.map((faculty) => (
                  <option key={faculty._id} value="MSD">
                    {faculty.name}
                  </option>
                ))}
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
      </div>
    </>
  );
};

export default Consultations;
