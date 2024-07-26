import React, { useState } from "react";
import "../styles/Account.css";

const CourseSequence = () => {
  const [courses, setCourses] = useState([
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
    "CSE340",
    "CSE470",
    "CSE421",
    "SOC101",
  ]);

  return (
    <>
      <div className="body-container">
        <div className="course-sequence-container">
          <h1>Course Sequence</h1>
          <hr />
          <ul className="course-sequence-list">
            {courses.map((course, index) => (
              <li key={index} className="course-sequence-list-item">
                {course}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CourseSequence;
