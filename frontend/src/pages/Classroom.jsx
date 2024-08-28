import { useEffect, useRef, useState } from "react";
import "../styles/Classroom.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const Classroom = () => {
  const [classroom, setClassroom] = useState(null);
  const [clicked, setClicked] = useState(false);
  const dropDownRef = useRef(null);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleOutsideClick = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setClicked(false);
    }
  };

  useEffect(() => {
    if (clicked) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [clicked]);

  return (
    <div className="classroom-container">
      <div className="classroom-inner-container">
        <Link to="" className="classroom-individual-class">
          <div className="classroom-top-section">
            {/* <img src="" alt="Classroom Owner" /> */}
            <div className="classroom-owner-picture-alter">
              <p>A</p>
            </div>
            <div className="classroom-vertical-menu-div">
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="classroom-vertical-menu"
                onClick={handleClick}
                ref={dropDownRef}
              />
              <div
                className={
                  clicked
                    ? "classroom-inner-option"
                    : "classroom-inner-option-not-active"
                }
              >
                <Link to="#" className="classroom-inner-option-link">
                  Unenroll
                </Link>
              </div>
            </div>
          </div>
          <div className="classroom-bottom-section">
            <span className="classroom-couseCode">CSE340</span>
            <span className="classroom-courseName">Computer Architecture</span>
            <span className="classroom-semester">Summer2024</span>
            <span className="classroom-created">Created: 20/03/2024</span>
          </div>
        </Link>

        {/* <h2>Classroom</h2> */}
      </div>
    </div>
  );
};

export default Classroom;
