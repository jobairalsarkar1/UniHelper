import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Account.css";

const CourseSequence = () => {
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    const fetchCourses = async () => {
      await axios
        .get("/api/courses/get-courses")
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

  return (
    <>
      <div className="body-container">
        <div className="course-sequence-container">
          <h1>Course Sequence</h1>
          <hr />
          {courses ? (
            <ul className="course-sequence-list">
              {courses.map((course) => (
                <li key={course._id} className="course-sequence-list-item">
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
