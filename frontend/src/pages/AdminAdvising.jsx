import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Advising.css";
import { convertUTCToLocal } from "../utils";

const AdminAdvising = () => {
  const [formData, setFormData] = useState({
    advisingSlot: "",
    creditRangeStart: "",
    creditRangeEnd: "",
    semester: "",
  });
  const [pendingPanels, setPendingPanels] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [approval, setApproval] = useState(false);
  const [actualSemester, setActualSemester] = useState("");
  const [semesterCreated, setSemesterCreated] = useState("");
  const { advisingSlot, creditRangeStart, creditRangeEnd, semester } = formData;

  useEffect(() => {
    const fetchAdvisingPanel = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "/api/advising-panels/get-pending-advising-panels",
          { headers: { "x-auth-token": token } }
        );
        if (response.status === 200) {
          setPendingPanels(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAdvisingPanel();
  }, [success, approval]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSlotSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    const data = {
      advisingSlot,
      creditRangeStart: parseInt(creditRangeStart),
      creditRangeEnd: parseInt(creditRangeEnd),
      semester,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/advising-panels/create-advising-slot",
        data,
        { headers: { "x-auth-token": token } }
      );
      if (response.status === 201) {
        setSuccess(response.data.message);
      }
      setTimeout(
        () =>
          setFormData({
            advisingSlot: "",
            creditRangeStart: "",
            creditRangeEnd: "",
            semester: "",
          }),
        1000
      );
      setTimeout(() => setSuccess(""), 1000);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  const handleApprove = async (panelId) => {
    setApproval(false);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/api/advising-panels/approve-advising/${panelId}`,
        {},
        { headers: { "x-auth-token": token } }
      );
      if (response.status === 200) {
        setApproval(!approval);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSemesterCreation = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/advising-panels/create-actual-semester",
        { semesterName: actualSemester },
        { headers: { "x-auth-token": token } }
      );
      if (response.status === 201) {
        setSemesterCreated(response.data.message);
      }
    } catch (error) {
      setSemesterCreated(error.response?.data?.message);
      // console.error(error.response?.data?.message);
    } finally {
      setTimeout(() => setSemesterCreated(""), 1000);
      setTimeout(() => setActualSemester(""), 1000);
    }
  };

  return (
    <div className="adminAdvising-container">
      <div className="adminAdvising-inner-container">
        <div className="gradeSheetIndividual-create-semester-form">
          <input
            type="text"
            name="semester"
            value={actualSemester}
            onChange={(e) => setActualSemester(e.target.value)}
            placeholder="Semester.."
            className="gradeSheetIndividual-semester-input"
            required
          />
          <button
            type="button"
            className="gradeSheetIndividual-create-gradesheet-btn custom-bg-4"
            onClick={handleSemesterCreation}
          >
            Create
          </button>
          {semesterCreated && (
            <p style={{ fontSize: "0.75rem" }}>{semesterCreated}</p>
          )}
        </div>
        {/* <div className="adminAdvising-create-semester">
          <span>Create Semester</span>
        </div> */}
        <div className="adminAdvising-create-slot-container">
          <span className="create-slot-title">Create Slot</span>
          <div className="adminAdvising-slot-items">
            <label htmlFor="slotTime">Advising Time:</label>
            <input
              type="datetime-local"
              name="slotTime"
              id="slotTime"
              value={advisingSlot}
              onChange={(e) =>
                setFormData({ ...formData, advisingSlot: e.target.value })
              }
            />
          </div>
          <div className="adminAdvising-credit-range">
            <div className="adminAdvising-slot-items slot-items-inner">
              <label htmlFor="creditRangeStart">Start:</label>
              <input
                type="number"
                name="creditRangeStart"
                id="creditRangeStart"
                placeholder="Credit Range"
                value={creditRangeStart}
                onChange={handleChange}
              />
            </div>
            <div className="adminAdvising-slot-items slot-items-inner">
              <label htmlFor="creditRangeEnd">End:</label>
              <input
                type="number"
                name="creditRangeEnd"
                id="creditRangeEnd"
                placeholder="Credit Range"
                value={creditRangeEnd}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="adminAdvising-slot-items">
            <label htmlFor="semester">Semester:</label>
            <input
              type="text"
              name="semester"
              id="semester"
              placeholder="Semester"
              value={semester}
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="create-advising-slot-btn"
            onClick={handleSlotSubmit}
          >
            Create Advising Slot
          </button>
          {success && (
            <p
              style={{
                color: "green",
                textAlign: "center",
                fontSize: "0.75rem",
              }}
            >
              {success}
            </p>
          )}
          {error && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                fontSize: "0.75rem",
              }}
            >
              {error}
            </p>
          )}
        </div>
        <div className="adminAdvising-available-slots-container">
          <span className="create-slot-title">Advising to Appprove</span>
          <hr />
          {pendingPanels?.length > 0 ? (
            <>
              {pendingPanels.map((panel) => (
                <div key={panel._id} className="adminAdvising-slot-toApprove">
                  <div className="adminAdvising-panel-details">
                    <span>
                      Name: <strong>{panel.student.name}</strong>
                    </span>
                    <span>
                      ID: <strong>{panel.student.ID}</strong>
                    </span>
                    <span
                      className="slot-datetime-special"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      DateTime:{" "}
                      <strong>{convertUTCToLocal(panel.advisingSlot)}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    className="advising-approve-btn"
                    onClick={() => handleApprove(panel._id)}
                  >
                    Approve
                  </button>
                </div>
              ))}
            </>
          ) : (
            <>
              <h2 className="nothing-available">No Panel to Approve</h2>
            </>
          )}
          {/* <div className="adminAdvising-slot-toApprove">
            <div className="adminAdvising-panel-details">
              <span>
                Name: <strong>Jobair Al Sarkar</strong>
              </span>
              <span>
                ID: <strong>21201175</strong>
              </span>
              <span className="slot-datetime-special">
                DateTime: <strong>10, May 2024 1030</strong>
              </span>
            </div>
            <button type="button" className="advising-approve-btn">
              Approve
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminAdvising;
