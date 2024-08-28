import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Schedule, SearchThings } from "../components";
import "../styles/Advising.css";

const AdvisingPannel = () => {
  const { userOne } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="advising-pannel-container">
      <div className="advising-pannel-inner-container">
        <div className="advising-pannel-student-info">
          <div className="advising-pannel-first-info advising-pannel-name-semester">
            <p>
              Name: <span>{userOne.name}</span>
            </p>
            <p>
              ID: <span>{userOne.ID}</span>
            </p>
            <p>
              Semester: <span>Spring2024</span>
            </p>
          </div>
          <div className="advising-pannel-first-info advising-pannel-attempted-credit">
            <p>
              Attempted Credit: <span>84</span>
            </p>
            <p>
              Completed Credit: <span>84</span>
            </p>
          </div>
          <div className="advising-pannel-first-info advising-pannel-name-semester">
            <p>
              Allowed Credit(Max): <span>12</span>
            </p>
            <p>
              Allowed Credit(min): <span>9</span>
            </p>
          </div>
        </div>
        <div className="advising-pannel-window">
          <span className="advising-pannel-title-01">Advising Pannel</span>
          <div className="advising-pannel-search-bar">
            <SearchThings
              searchText={searchText}
              handleSearchChange={handleSearchChange}
            />
          </div>
          <div className="advising-pannel-course-selection">
            <div className="advising-pannel-select-course">
              <p>Select Courses:</p>
              <ul className="advising-pannel-courses">
                <li className="advising-pannel-course">
                  <span className="advising-course-info">
                    CSE470-TBA[03]-[10A08C]
                  </span>
                  <button type="button" className="advising-course-add-btn">
                    Add
                  </button>
                </li>
              </ul>
            </div>
            <div className="advising-pannel-select-course">
              <p>Selected Courses:</p>
              <ul className="advising-pannel-courses">
                <li className="advising-pannel-course">
                  <span className="advising-course-info">
                    CSE470-TBA[07]-[10A09C]
                  </span>
                  <button type="button" className="advising-course-drop-btn">
                    Drop
                  </button>
                </li>
              </ul>
            </div>
            <div className="advising-pannel-course-sechedule">
              <p>Course Details:</p>
              <div className="advising-pannel-course-time"></div>
            </div>
          </div>
        </div>
        <div className="advising-pannel-semester-routine">
          <span>Class Schedule:</span>
          <div className="advising-pannel-class-schedule">
            <Schedule />
          </div>
        </div>
        {/* <h2>Advising Pannel</h2> */}
      </div>
    </div>
  );
};

export default AdvisingPannel;
