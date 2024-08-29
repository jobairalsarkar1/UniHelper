import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import "../styles/Classroom.css";

const Classroom = () => {
  const { userOne } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    semester: "",
  });
  const [classroom, setClassroom] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [clicked, setClicked] = useState(false);
  const dropDownRef = useRef(null);

  const { title, name, semester } = formData;

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        {userOne.status === "teacher" && (
          <>
            {" "}
            <div className="classroom-create-class-container">
              <form onSubmit={handleSubmit} className="classroom-create-form">
                <div className="classroom-create-title-name">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                  />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="classroom-create-semester-request">
                  <input
                    type="text"
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    placeholder="Semester"
                    required
                  />
                  <button type="submit" className="classroom-create-btn">
                    Create Classroom
                  </button>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
              </form>
              {/* <span>Create Classroom</span> */}
            </div>
          </>
        )}

        <div className="classroom-classes-container">
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
              <span className="classroom-courseName">
                Computer Architecture
              </span>
              <span className="classroom-semester">Summer2024</span>
              <span className="classroom-created">Created: 20/03/2024</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
