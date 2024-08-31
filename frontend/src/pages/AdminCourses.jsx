import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchThings } from "../components";
import axios from "axios";
import "../styles/AllUsers.css";

const AdminCourses = () => {
  const [formData, setFormData] = useState({
    name: "",
    courseCode: "",
    credit: "",
    description: "",
  });
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const { name, courseCode, credit, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const newCourse = { name, courseCode, credit, description };
      setCourses((prevCourses) => [...prevCourses, newCourse]);
      const response = await axios.post(
        "/api/courses/create-course",
        newCourse,
        { headers: { "x-auth-token": token } }
      );
      if (response.data) {
        // setCourses((prevCourses) => [...prevCourses, response.data]);
        setSuccess("Course created successfully.");
        setTimeout(() => setSuccess(""), 3000);
        fetchCourses();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went Wrong.");
      // alert(error);
    } finally {
      setFormData({ name: "", courseCode: "", credit: "", description: "" });
      setTimeout(() => setError(), 2000);
    }
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchedResults = courses.filter((item) =>
          // item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.courseCode.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchedResults);
      }, 500)
    );
  };

  const handleDelete = async (courseId) => {
    // alert(courseId);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `/api/courses/delete-course/${courseId}`,
        { headers: { "x-auth-token": token } }
      );
      if (response.data) {
        setCourses(courses.filter((course) => course._id !== courseId));
        setSearchedResults(
          searchedResults.filter((course) => course._id !== courseId)
        );
      }
    } catch (error) {
      alert("Failed to Delete course" + error.message);
    }
  };

  // Fetch courses only when component mounts
  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("/api/courses/get-courses", {
        headers: { "x-auth-token": token },
      });
      const sortedCourses = response.data.sort((a, b) =>
        a.courseCode.localeCompare(b.courseCode)
      );
      setCourses(sortedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    // const token = localStorage.getItem("token");
    // axios
    //   .get("/api/courses/get-courses", { headers: { "x-auth-token": token } })
    //   .then((response) => {
    //     const sortedCourses = response.data.sort((a, b) =>
    //       a.courseCode.localeCompare(b.courseCode)
    //     );
    //     setCourses(sortedCourses);
    //   })
    //   .catch((error) => alert(error));
  }, []);

  return (
    <div className="create-course-container">
      <div className="create-course-form-container">
        <form onSubmit={onSubmit} className="create-course-form">
          <h2>Create Course</h2>
          <div className="course-form-items">
            <label htmlFor="name">Course Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="name"
              value={formData.name}
              placeholder="Enter a Course Name"
              onChange={handleChange}
            />
          </div>
          <div className="course-form-items">
            <label htmlFor="courseCode">Course Code:</label>
            <input
              type="text"
              id="courseCode"
              name="courseCode"
              className="courseCode"
              value={formData.courseCode}
              placeholder="Enter a Course Code"
              onChange={handleChange}
            />
          </div>
          <div className="course-form-items">
            <label htmlFor="credit">Course Credit:</label>
            <input
              type="number"
              id="credit"
              name="credit"
              className="credit"
              value={formData.credit}
              placeholder="Enter a Course Credit"
              onChange={handleChange}
            />
          </div>
          <div className="course-form-items">
            <label htmlFor="description">Course Description:</label>
            <textarea
              type="text"
              id="description"
              name="description"
              className="description"
              value={formData.description}
              placeholder="Enter a Course Description"
              onChange={handleChange}
            />
          </div>
          {error && (
            <p
              style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}
            >
              {error}
            </p>
          )}
          {success && (
            <p
              style={{
                color: "green",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              {success}
            </p>
          )}
          <button type="submit" className="course-create-btn">
            Create
          </button>
        </form>
        <div className="active-courses">
          <SearchThings
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
          {searchText ? (
            <>
              {searchedResults?.length > 0 ? (
                <>
                  <div className="active-courses-list">
                    <h2>Searched Courses</h2>
                    <hr />
                    {searchedResults.map((course) => (
                      <div key={course._id} className="active-course">
                        <div className="course-info-inner">
                          <p>
                            Course Code:{" "}
                            <Link
                              to={`/edit-course/${course._id}`}
                              className="course-code-inner"
                            >
                              {course.courseCode}
                            </Link>
                          </p>
                          <p>Course Name: {course.name}</p>
                        </div>
                        <button
                          type="button"
                          className="delete-course-btn"
                          onClick={() => handleDelete(course._id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="no-courses-found">
                    No Searched Reasults Found
                  </h2>
                </>
              )}
            </>
          ) : (
            <>
              {courses?.length > 0 ? (
                <>
                  <div className="active-courses-list">
                    <h2>Available Courses</h2>
                    <hr />
                    {courses.map((course) => (
                      <div key={course._id} className="active-course">
                        <div className="course-info-inner">
                          <p>
                            Course Code:{" "}
                            <Link
                              to={`/edit-course/${course._id}`}
                              className="course-code-inner"
                            >
                              {course.courseCode}
                            </Link>
                          </p>
                          <p>Course Name: {course.name}</p>
                        </div>
                        <button
                          type="button"
                          className="delete-course-btn"
                          onClick={() => handleDelete(course._id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="no-courses-found">No Courses Found.</h2>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;
