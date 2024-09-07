import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { convertUTCToLocal } from "../utils";
import axios from "axios";
import "../styles/Consultations.css";

const Consultations = () => {
  const { userOne } = useContext(AuthContext);
  // const [myConsultations, setMyConsultations] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [newConsultation, setNewConsultation] = useState({
    teacher: "",
    topic: "",
    consultationTime: "",
  });
  const [rejectionReason, setRejectionReason] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [openRejectionForm, setOpenRejectionForm] = useState(null);

  const { teacher, topic, consultationTime } = newConsultation;

  const fetchConsultations = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/consultations/get-consultations", {
        headers: { "x-auth-token": token },
      });
      if (response.data && response.data.length > 0) {
        const userConsultations = response.data.filter(
          (consultation) =>
            consultation.teacher._id === userOne._id ||
            consultation.student._id === userOne._id
        );
        setApprovedRequests(
          userConsultations.filter(
            (consultation) => consultation.status === "Approved"
          )
        );
        setRejectedRequests(
          userConsultations.filter(
            (consultation) => consultation.status === "Rejected"
          )
        );
        setPendingRequests(
          userConsultations.filter(
            (consultation) => consultation.status === "Pending"
          )
        );
      } else {
        setApprovedRequests([]);
        setRejectedRequests([]);
        setPendingRequests([]);
      }
    } catch (error) {
      console.error("Failed to fetch consultations.");
    }
  }, [userOne._id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/users/all-users", { headers: { "x-auth-token": token } })
      .then((response) => {
        setFaculties(response.data.filter((user) => user.status === "teacher"));
      })
      .catch((error) => alert(error));
  }, []);

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/consultations/make-request",
        {
          student: userOne._id,
          teacher,
          topic,
          consultationTime,
        },
        { headers: { "x-auth-token": token } }
      );

      if (response.status === 201) {
        setSuccess("Request made successfully");
        fetchConsultations();
      }
    } catch (error) {
      setError(error.message);
      // alert("Failed to make request");
    } finally {
      setTimeout(() => setSuccess(""), 2000);
      setTimeout(() => setError(""), 2000);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "/api/consultations/approve-conulstation",
        {
          consultationId: requestId,
          status: "Approved",
        }
      );
      if (response.status === 200) {
        fetchConsultations();
      }
    } catch (error) {
      alert("Failed to approve request.");
    }
  };

  const handleRejection = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "/api/consultations/reject-consultation",
        { consultationId: requestId, status: "Rejected", rejectionReason },
        { headers: { "x-auth-token": token } }
      );
      if (response.status === 200) {
        fetchConsultations();
      }
    } catch (error) {
      alert("Failed to Reject Request");
    } finally {
      setTimeout(() => setRejectionReason(""), 2000);
    }
  };

  const handleClick = (requestI) => {
    setOpenRejectionForm((prev) => (prev === requestI ? null : requestI));
  };

  return (
    <>
      <div className="consultations-container">
        <div className="consultations-inner-container">
          {userOne.status === "student" && (
            <>
              {" "}
              <form
                onSubmit={handleSubmit}
                className="consultation-request-form"
              >
                <span>Make Consultation Request</span>
                <input
                  type="text"
                  name="topc"
                  className="consultation-reason-input"
                  value={topic}
                  onChange={(e) =>
                    setNewConsultation({
                      ...newConsultation,
                      topic: e.target.value,
                    })
                  }
                  placeholder="Enter your Consultation Reason"
                  required
                />
                <div className="consultation-others-container">
                  <select
                    name="select-faculty"
                    id="select-faculty"
                    className="select-faculty"
                    value={teacher}
                    onChange={(e) =>
                      setNewConsultation({
                        ...newConsultation,
                        teacher: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select Faculty</option>
                    {faculties.map((faculty) => (
                      <option key={faculty._id} value={faculty._id}>
                        {faculty.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="datetime-local"
                    className="consultation-time"
                    value={consultationTime}
                    onChange={(e) =>
                      setNewConsultation({
                        ...newConsultation,
                        consultationTime: e.target.value,
                      })
                    }
                    required
                  />
                  <button type="submit" className="consultation-request-btn">
                    Make Request
                  </button>
                </div>
                {error && (
                  <p className="operation-status" style={{ color: "red" }}>
                    {error}
                  </p>
                )}
                {success && (
                  <p className="operation-status" style={{ color: "green" }}>
                    {success}
                  </p>
                )}
              </form>
            </>
          )}
          <div className="consultation-requests-state">
            <div className="approved-consultation-request">
              <span className="approved-requests">Approved Requests</span>
              <hr />
              {approvedRequests.length > 0 ? (
                <>
                  {approvedRequests.map((request) => (
                    <div
                      key={request._id}
                      className="individual-consultation-container"
                    >
                      <div className="individual-consultation-request">
                        <div className="basic-consultation-info">
                          <p>
                            With:{" "}
                            {userOne.status === "teacher" ? (
                              <>
                                <strong>{request.student.name}</strong>
                              </>
                            ) : (
                              <>
                                <strong>{request.teacher.name}</strong>
                              </>
                            )}
                          </p>
                          <p>
                            Schedule:{" "}
                            <small>
                              {convertUTCToLocal(request.consultationTime)}
                            </small>
                          </p>
                        </div>
                        <div className="basic-consultation-info2">
                          <span className="request-status">
                            Status: <strong>{request.status}</strong>
                          </span>
                          {request.meetingLink && (
                            <>
                              <a
                                href={request.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="join-consultation-btn"
                              >
                                Join
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <p className="consultations-current-status-null">
                    No Approved Request
                  </p>
                </>
              )}
            </div>
            <div className="pending-counsultation-request">
              <span className="pending-requests">Pending Requests</span>
              <hr />
              {pendingRequests.length > 0 ? (
                <>
                  {pendingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="individual-consultation-container"
                    >
                      <div className="individual-consultation-request">
                        <div className="basic-consultation-info">
                          <p>
                            With:{" "}
                            {userOne.status === "teacher" ? (
                              <>
                                <strong>{request.student.name}</strong>
                              </>
                            ) : (
                              <>
                                <strong>{request.teacher.name}</strong>
                              </>
                            )}
                          </p>
                          <p>
                            Schedule:{" "}
                            <small>
                              {convertUTCToLocal(request.consultationTime)}
                            </small>
                          </p>
                        </div>
                        <div className="basic-consultation-info2">
                          <span className="request-status">
                            Status: <strong>{request.status}</strong>
                          </span>
                          {userOne.status === "teacher" && (
                            <>
                              <div className="consultation-takeAction-div">
                                <button
                                  type="button"
                                  className="consultation-approve-btn"
                                  onClick={() => handleApprove(request._id)}
                                >
                                  Approve
                                </button>
                                <button
                                  className={
                                    openRejectionForm === request._id
                                      ? "consultation-reject-btn notActive"
                                      : "consultation-reject-btn"
                                  }
                                  onClick={() => handleClick(request._id)}
                                >
                                  Reject
                                </button>
                              </div>
                              {/* <Link
                              to={`/consultation/${request._id}`}
                              className="consultation-takeAction-btn"
                            >
                              Take Action
                            </Link> */}
                            </>
                          )}
                        </div>
                      </div>
                      <div
                        className={
                          openRejectionForm === request._id
                            ? "consultation-rejection-form active"
                            : "consultation-rejection-form"
                        }
                      >
                        <input
                          type="text"
                          name="rejectionReason"
                          className="rejectionReason"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          placeholder="Reason for rejection"
                        />
                        <button
                          type="submit"
                          className="consultation-reject-btn"
                          onClick={() => handleRejection(request._id)}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <p className="consultations-current-status-null">
                    No Pending Request
                  </p>
                </>
              )}
            </div>
            <div className="rejected-counsultation-request">
              <span className="rejected-requests">Rejected Requests:</span>
              <hr />
              {rejectedRequests.length > 0 ? (
                <>
                  {rejectedRequests.map((request) => (
                    <div
                      key={request._id}
                      className="individual-consultation-container"
                    >
                      <div className="individual-consultation-request">
                        <div className="basic-consultation-info">
                          <p>
                            With:{" "}
                            {userOne.status === "teacher" ? (
                              <>
                                <strong>{request.student.name}</strong>
                              </>
                            ) : (
                              <>
                                <strong>{request.teacher.name}</strong>
                              </>
                            )}
                          </p>
                          <p>
                            Schedule:{" "}
                            <small>
                              {convertUTCToLocal(request.consultationTime)}
                            </small>
                          </p>
                        </div>
                        <div className="basic-consultation-info2">
                          <span className="request-status">
                            Status:{" "}
                            <strong style={{ color: "red" }}>
                              {request.status}
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <p className="consultations-current-status-null">
                    No Pending Request
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Consultations;
