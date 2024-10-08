import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MultiSelect } from "../components";
import axios from "axios";
import "../styles/Courses.css";

const EditCourse = () => {
  const { courseId } = useParams();
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sectionNumber: null,
    days: [],
    startTime: "",
    endTime: "",
    classRoom: "",
    dayL: "",
    startTimeL: "",
    endTimeL: "",
    roomL: "",
  });
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [haveLab, setHaveLab] = useState(false);
  const {
    sectionNumber,
    days,
    startTime,
    endTime,
    classRoom,
    dayL,
    startTimeL,
    endTimeL,
    roomL,
  } = formData;

  const dayOptions = [
    { _id: "1", name: "Mon", ID: "MON", status: "monday" },
    { _id: "2", name: "Tue", ID: "TUE", status: "tuesday" },
    { _id: "3", name: "Wed", ID: "WED", status: "wednesday" },
    { _id: "4", name: "Thu", ID: "THU", status: "thursday" },
    { _id: "5", name: "Fri", ID: "FRI", status: "friday" },
    { _id: "6", name: "Sat", ID: "SAT", status: "saturday" },
    { _id: "7", name: "Sun", ID: "SUN", status: "sunday" },
  ];

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/courses/get-course/${courseId}`,
          { headers: { "x-auth-token": token } }
        );
        setSections(response.data.sections);
      } catch (error) {
        setError("Faild to fetch sections.");
      }
    };
    fetchSection();
  }, [courseId]);

  const handleDayChange = (selectedDays) => {
    const daysArray = selectedDays ? selectedDays.map((day) => day.ID) : [];
    setFormData({ ...formData, days: daysArray });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const lab =
        haveLab && dayL && startTimeL && endTimeL && roomL
          ? {
              dayL: dayL,
              startTimeL: startTimeL,
              endTimeL: endTimeL,
              roomL: roomL,
            }
          : null;
      const response = await axios.post(
        `http://localhost:5000/api/courses/create-section/${courseId}`,
        {
          sectionNumber,
          schedule: { days, startTime, endTime },
          classRoom,
          ...(lab && { lab }),
        },
        { headers: { "x-auth-token": token } }
      );
      if (response.data) {
        setSuccess("Section created successfully.");
        setSections((prevSections) => [...prevSections, response.data]);
        setFormData({
          sectionNumber: null,
          day: "",
          startTime: "",
          endTime: "",
          classRoom: "",
          dayL: "",
          startTimeL: "",
          endTimeL: "",
          roomL: "",
        });
        setHaveLab(false);
      }
    } catch (error) {
      // alert(error);
      setError(error.response?.data?.message || "Failed to create section.");
    } finally {
      setTimeout(() => {
        setSuccess("");
        setError(null);
      }, 2000);
    }
  };

  const handleDelete = async (sectionId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/courses/delete-section/${sectionId}`,
        { headers: { "x-auth-token": token } }
      );
      if (response.data) {
        setSections(sections.filter((section) => section._id != sectionId));
      }
    } catch (error) {
      alert("Failed to delete Section.");
    }
  };

  return (
    <>
      <div className="edit-course-container">
        <div className="edit-course-inner-container">
          {/* <h1>{courseId}</h1> */}
          <form
            onSubmit={handleSubmit}
            className="edit-course-create-section-form"
          >
            <span className="edit-course-form-title">Create Section</span>
            <div className="edit-course-sectionNumber-day">
              <div className="edit-course-items">
                <label htmlFor="sectionNumber">Section Number:</label>
                <input
                  type="number"
                  id="sectionNumber"
                  name="sectionNumber"
                  value={sectionNumber}
                  onChange={handleChange}
                  placeholder="Enter Number"
                  required
                />
              </div>
              <div className="edit-course-items">
                <label htmlFor="days">Select Day:</label>
                <MultiSelect
                  options={dayOptions}
                  onChange={handleDayChange}
                  placeholder="Select Days"
                />
                {/* <select
                  name="day"
                  id="day"
                  className="edit-course-day-select"
                  value={day}
                  onChange={handleChange}
                >
                  <option value="">Select Day</option>
                  <option value="sat">Sat</option>
                  <option value="sun">Sun</option>
                  <option value="mon">Mon</option>
                  <option value="tue">Tue</option>
                  <option value="wed">Wed</option>
                  <option value="thu">Thu</option>
                  <option value="fri">Fri</option>
                </select> */}
              </div>
            </div>
            <div className="edit-course-startTime-endTime">
              <div className="edit-course-items">
                <label htmlFor="startTime">Start Time:</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={startTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="edit-course-items">
                <label htmlFor="endTime">End Time:</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="edit-course-classRoom-request">
              <div className="edit-course-items">
                <label htmlFor="classRoom">Classroom:</label>
                <input
                  type="text"
                  id="classRoom"
                  name="classRoom"
                  value={classRoom}
                  onChange={handleChange}
                  placeholder="Classroom Number"
                  required
                />
              </div>
            </div>
            <div className="edit-course-have-lab-container">
              <span onClick={() => setHaveLab(!haveLab)}>
                {haveLab ? "No Lab?" : "Have Lab?"}
              </span>
              <div
                className={
                  haveLab
                    ? "edit-course-add-lab-too active"
                    : "edit-course-add-lab-too"
                }
              >
                <div className="edit-course-section-lab-add">
                  <div className="edit-course-items">
                    <label htmlFor="days">Select Day:</label>
                    <select
                      name="dayL"
                      id="dayL"
                      className="edit-course-day-select"
                      value={dayL}
                      onChange={handleChange}
                    >
                      <option value="">Select Day</option>
                      <option value="sat">Sat</option>
                      <option value="sun">Sun</option>
                      <option value="mon">Mon</option>
                      <option value="tue">Tue</option>
                      <option value="wed">Wed</option>
                      <option value="thu">Thu</option>
                      <option value="fri">Fri</option>
                    </select>
                  </div>
                  <div className="edit-course-items">
                    <label htmlFor="startTimeL">Start Time:</label>
                    <input
                      type="time"
                      id="startTimeL"
                      name="startTimeL"
                      value={startTimeL}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="edit-course-section-lab-add-2">
                  <div className="edit-course-items">
                    <label htmlFor="roomL">Lab Room:</label>
                    <input
                      type="text"
                      id="roomL"
                      name="roomL"
                      value={roomL}
                      onChange={handleChange}
                      placeholder="Lab Room"
                    />
                  </div>
                  <div className="edit-course-items">
                    <label htmlFor="endTimeL">End Time:</label>
                    <input
                      type="time"
                      id="endTimeL"
                      name="endTimeL"
                      value={endTimeL}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-course-classRoom-request">
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}
              {success && (
                <p style={{ color: "green", textAlign: "center" }}>{success}</p>
              )}
              <button type="submit" className="edit-course-create-section-btn">
                Create Section
              </button>
            </div>
          </form>
          <div className="edit-course-sections">
            <span>Sections:</span>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {sections?.length > 0 ? (
              <>
                <ul className="edit-course-sections-list">
                  {sections.map((section) => (
                    <li
                      key={section._id}
                      className="edit-course-sections-list-item"
                    >
                      <div className="edit-course-section-details">
                        <p>
                          Section: <span>{section.sectionNumber}</span>
                        </p>
                        <p>Classroom: {section.classRoom}</p>
                      </div>
                      <div className="edit-course-section-actions">
                        <Link
                          to={`/edit-section/${section._id}`}
                          className="edit-course-edit-btn"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="edit-course-delete-btn"
                          onClick={() => handleDelete(section._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <span className="no-section-available">
                  No Sections Available.
                </span>
              </>
            )}
            {/* <ul className="edit-course-sections-list">
              <li className="edit-course-sections-list-item">
                <p>
                  Section: <span>01</span>
                </p>
                <div className="edit-course-section-actions">
                  <Link type="button" className="edit-course-edit-btn">
                    Edit
                  </Link>
                  <button type="button" className="edit-course-delete-btn">
                    Delete
                  </button>
                </div>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCourse;
