import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../styles/Courses.css";
import { AuthContext } from "../contexts/AuthContext";

const CourseSequence = () => {
  const { userOne } = useContext(AuthContext);
  const [courses, setCourses] = useState(null);
  const [gradeSheet, setGradeSheet] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      await axios
        .get("/api/courses/get-courses", { headers: { "x-auth-token": token } })
        .then((response) => {
          const sortedCourses = response.data.sort((a, b) =>
            a.courseCode.localeCompare(b.courseCode)
          );
          setCourses(sortedCourses);
        })
        .catch((error) => alert(error));
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchGradeSheet = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `/api/grade-sheets/get-gradesheet/${userOne._id}`,
          { headers: { "x-auth-token": token } }
        );
        if (response.status === 200) {
          setGradeSheet(response.data);
        }
      } catch (error) {
        console.error(error.response?.data?.message);
        // alert(error.message);
      }
    };

    fetchGradeSheet();
  }, [userOne._id]);

  const isCourseCompleted = (courseId) => {
    return gradeSheet?.semesters?.some((semester) =>
      semester.courses.some((c) => c.course._id === courseId)
    );
  };

  return (
    <>
      <div className="courseSequence-container">
        <div className="courseSequence-inner-container">
          <span className="header-title">Course Sequence</span>
          <hr />
          {courses ? (
            <ul className="courseSequence-list">
              {courses.map((course) => (
                <li
                  key={course._id}
                  className={`coursSequence-list-item ${
                    isCourseCompleted(course._id) ? "completed" : ""
                  }`}
                >
                  {course.courseCode}
                </li>
              ))}
            </ul>
          ) : (
            <>
              <h2>No Courses Found</h2>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseSequence;
