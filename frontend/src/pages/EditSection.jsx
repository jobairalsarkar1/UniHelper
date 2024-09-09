import { useEffect, useState } from "react";
import { MultiSelect } from "../components";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Courses.css";

const EditSection = () => {
  const { sectionId } = useParams();
  const [sectionDetails, setSectionDetails] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [students, setStudents] = useState([]);
  const [sectionMembers, setSectionMembers] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/users/all-users", {
          headers: { "x-auth-token": token },
        });
        if (response.data) {
          //   setUsers(response.data);
          setStudents(
            response.data.filter((user) => user.status === "student")
          );
          setFaculty(response.data.filter((user) => user.status === "teacher"));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchSectionDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `/api/courses/get-section/${sectionId}`,
          { headers: { "x-auth-token": token } }
        );

        if (response.data && response.data.section) {
          setSectionDetails(response.data.section);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSectionDetails();
  }, [sectionId, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/courses/${sectionId}/add-members`,
        {
          faculty: selectedFaculty,
          students: sectionMembers.map((student) => student._id),
        },
        { headers: { "x-auth-token": token } }
      );
      setSuccess("Members added successfully");
      setSelectedFaculty("");
      setSectionMembers([]);
    } catch (error) {
      setError("Failed to add members");
    } finally {
      setTimeout(() => setSuccess(""), 2000);
      setTimeout(() => setError(""), 2000);
    }
  };

  const handleStudentChange = (selectedOptions) => {
    setSectionMembers(selectedOptions);
  };

  const handleRemove = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `/api/courses/${sectionId}/remove/${userId}`,
        {
          headers: { "x-auth-token": token },
        }
      );

      if (response.status === 200) {
        const updatedStudents = sectionDetails.students.filter(
          (student) => student._id !== userId
        );

        setSectionDetails((prevDetails) => ({
          ...prevDetails,
          students: updatedStudents,
        }));
      }
      //   alert("Ok");
    } catch (error) {
      //   alert("no");
      console.error(error.message);
    }
  };

  return (
    <div className="editSection-container">
      <div className="editSection-inner-container">
        <div className="editSection-elements-container">
          <form onSubmit={handleSubmit} className="editSection-form">
            <MultiSelect options={students} onChange={handleStudentChange} />
            <div className="editSection-faculty-submit">
              <select
                name="selectFaculty"
                id="selectFaculty"
                className="selectFaculty"
                onChange={(e) => setSelectedFaculty(e.target.value)}
              >
                <option value="">Select faculty</option>
                {faculty?.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-members-btn">
                Add
              </button>
            </div>
            {error && (
              <p style={{ color: "red" }} className="operation-status">
                {error}
              </p>
            )}
            {success && (
              <p style={{ color: "green" }} className="operation-status">
                {success}
              </p>
            )}
          </form>
          <div className="editSection-selected-users-div">
            {sectionDetails ? (
              <>
                <div className="editSection-section-info">
                  <span>
                    Course: <strong>{sectionDetails.course.courseCode}</strong>
                  </span>
                  <span>
                    Section: <strong>{sectionDetails.sectionNumber}</strong>
                  </span>
                  <span>
                    Faculty:{" "}
                    {sectionDetails.faculty ? (
                      <>
                        <strong>{sectionDetails.faculty.name}</strong>
                      </>
                    ) : (
                      <>
                        <strong>TBA</strong>
                      </>
                    )}
                  </span>
                  <span>
                    Room: <strong>{sectionDetails.classRoom}</strong>
                  </span>
                </div>
              </>
            ) : (
              <></>
            )}
            <span className="editSection-members-title">Section Members:</span>
            <ul className="member-info-list">
              <li className="editSection-header member-info-items member-info-item-id">
                ID
              </li>
              <li className="editSection-header member-info-items">Name</li>
              <li className="editSection-header member-info-items">Email</li>
              <li className="editSection-header member-info-items">ST</li>
              <li className="editSection-header member-info-items">Action</li>
            </ul>
            {sectionDetails?.students.map((student) => (
              <ul key={student._id} className="member-info-list-inner">
                <li className="member-info-items member-info-item-id">
                  {student.ID}
                </li>
                <li className="member-info-items">{student.name}</li>
                <li className="member-info-items">{student.email}</li>
                <li className="member-info-items">
                  {student.status ? student.status.toUpperCase()[0] : "N/A"}
                </li>
                <li className="member-info-items">
                  <button
                    onClick={() => handleRemove(student._id)}
                    className="editSection-remove-btn"
                  >
                    Remove
                  </button>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSection;