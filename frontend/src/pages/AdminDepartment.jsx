import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/AllUsers.css";
import Loader from "../components/Loader";

const AdminDepartment = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCourseSelection = (courseId) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(courseId)
        ? prevSelected.filter((id) => id !== courseId)
        : [...prevSelected, courseId]
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/departments/create-department",
        {
          name,
          details,
          selectedCourses,
        },
        { headers: { "x-auth-token": token } }
      );
      if (response.data) {
        setDepartments([...departments, response.data]);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went Wrong.");
      // alert(error);
    } finally {
      setTimeout(() => setName(""), 2000);
      setTimeout(() => setDetails(""), 2000);
      setTimeout(() => setSelectedCourses([]), 2000);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDelete = async (deptId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/departments/${deptId}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (response.data) {
        setDepartments(
          departments.filter((department) => department._id !== deptId)
        );
      }
    } catch (error) {
      alert(`Failed to delete course. ${error.message}`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/courses/get-courses", {
        headers: { "x-auth-token": token },
      })
      .then((response) => {
        const sortedCourses = response.data.sort((a, b) =>
          a.courseCode.localeCompare(b.courseCode)
        );
        setCourses(sortedCourses);
      })
      .catch((error) => alert(error.message));

    setLoading(true);
    axios
      .get("http://localhost:5000/api/departments/get-departments", {
        headers: { "x-auth-token": token },
      })
      .then((response) => {
        const sortedDepartments = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setDepartments(sortedDepartments);
      })
      .catch((error) => alert(error));
    setLoading(false);
  }, [selectedCourses]);

  return (
    <div className="create-course-container">
      <div className="create-course-form-container">
        <form onSubmit={onSubmit} className="create-course-form">
          <span className="course-success-popup">{success && "Success"}</span>
          <h2>Create Department</h2>
          <div className="course-form-items">
            <label htmlFor="name">Department Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="name"
              value={name}
              placeholder="Department Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="course-form-items">
            <label htmlFor="details">Department Details:</label>
            <textarea
              type="text"
              id="details"
              name="details"
              className="details"
              value={details}
              placeholder="Department Details"
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </div>
          <div className="course-form-items">
            <label htmlFor="selectedOptions">Select Courses:</label>
            <div
              id="selectedOptions"
              className="inner-course-dropdown"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedCourses.length === 0
                ? "Select Courses"
                : selectedCourses
                    .map((id) => {
                      const course = courses.find(
                        (course) => course._id === id
                      );
                      return course ? course.courseCode : null;
                    })
                    .join(", ")}

              {dropdownOpen && (
                <ul className="inner-dropdown-selectedCourse">
                  {courses.map((course) => (
                    <li
                      key={course._id}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the dropdown from closing
                        handleCourseSelection(course._id);
                      }}
                      style={{
                        padding: "0.5rem",
                        cursor: "pointer",
                        backgroundColor: selectedCourses.includes(course._id)
                          ? "#f0f0f0"
                          : "#fff",
                      }}
                    >
                      {course.courseCode}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {error && (
            <p
              style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}
            >
              {error}
            </p>
          )}
          <button type="submit" className="course-create-btn">
            Create
          </button>
        </form>
        <div className="active-courses">
          <h2>Available Departments</h2>
          <hr />
          {departments ? (
            <>
              {loading ? (
                <>
                  <div className="loader-container-actual">
                    <Loader />
                  </div>
                </>
              ) : (
                <>
                  <div className="active-courses-list">
                    {departments.map((department) => (
                      <div key={department._id} className="active-course">
                        <div className="course-info-inner">
                          <p>
                            Course Code:{" "}
                            <Link
                              to={`/admin-course/${department._id}`}
                              className="course-code-inner"
                            >
                              {department.name}
                            </Link>
                          </p>
                        </div>
                        <button
                          type="button"
                          className="delete-course-btn"
                          onClick={() => handleDelete(department._id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <h2 className="no-courses-found">No Courses Found.</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDepartment;
