// import React from "react";
import { Link } from "react-router-dom";
import "../styles/AllUsers.css";

const AllStudents = ({ students, redirectTo }) => {
  return (
    <div className="allStudents-container">
      <span className="all-students-title">All Students</span>
      {students?.length > 0 ? (
        <>
          <ul className="student-info-list">
            <li className="student-list-header student-info-items student-info-item-id">
              ID
            </li>
            <li className="student-list-header student-info-items">Name</li>
            <li className="student-list-header student-info-items">Email</li>
            <li className="student-list-header student-info-items">Action</li>
          </ul>
          {students.map((student) => (
            <ul key={student._id} className="student-info-list-inner">
              <li className="student-info-items student-info-item-id">
                {student.ID}
              </li>
              <li className="student-info-items">{student.name}</li>
              <li className="student-info-items">
                <a href={`mailto:${student.email}`}>{student.email}</a>
              </li>
              <li className="student-info-items">
                <Link to={`${redirectTo}/${student._id}`} className="edit-btn">
                  GradeSheet
                </Link>
              </li>
            </ul>
          ))}
        </>
      ) : (
        <>
          <h2 className="no-users-data">No Students Found.</h2>
        </>
      )}
    </div>
  );
};

export default AllStudents;
