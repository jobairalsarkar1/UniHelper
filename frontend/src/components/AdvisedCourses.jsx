import { useState } from "react";

const AdvisedCourses = () => {
  const [advisedCourses, setAdvisedCourses] = useState(null);
  return (
    <div className="advised-courses-container">
      <div className="advised-courses-inner-container">
        <div className="advised-courses-list">
          <span className="advised-courses-title">Advised Courses</span>
          <ul className="advised-courses-info-list">
            <li className="advised-courses-list-header advised-courses-info-items advised-courses-info-item-id">
              Section
            </li>
            <li className="advised-courses-list-header advised-courses-info-items">
              Course Code
            </li>
            <li className="advised-courses-list-header advised-courses-info-items">
              Time
            </li>
            <li className="advised-courses-list-header advised-courses-info-items">
              Faculty
            </li>
            <li className="advised-courses-list-header advised-courses-info-items">
              Room No
            </li>
          </ul>
          {advisedCourses?.length > 0 ? (
            <>
              <p>Hello</p>
            </>
          ) : (
            <>
              <p className="no-course-found">No Courses are Advised</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvisedCourses;
