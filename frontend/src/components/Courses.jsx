import React, { useState } from "react";
import SideNav from "./SideNav";
import { Link } from "react-router-dom";
import "../styles/EnrolledCourses.css";

const Courses = () => {
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
  ]);
  return (
    <>
      <div className="body-container">
        {/* <SideNav /> */}
        <div className="enrolled-courses-container">
          <h1>Enrolled Courses</h1>
          <hr />
          <ul className="enrolled-courses-list">
            {courses.map((course, index) => (
              <li key={index} className="enrolled-courses-list-item">
                <Link to={"/" + course} className="enrolled-courses-item-link">
                  {course}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Courses;
