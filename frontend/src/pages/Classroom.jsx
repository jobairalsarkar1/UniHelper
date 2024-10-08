import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "../components";
import { AuthContext } from "../contexts/AuthContext";
import { formatDate } from "../utils";
import axios from "axios";
import "../styles/Classroom.css";

const Classroom = () => {
  const { userOne } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    semester: "",
  });
  // const [classrooms, setClassrooms] = useState([]);
  const [myClassrooms, setMyClassrooms] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // const [clicked, setClicked] = useState(false);
  // const dropDownRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(false);

  const { title, name, semester } = formData;

  useEffect(() => {
    const fetchClassrooms = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://unihelper.onrender.com/api/classrooms/get-classrooms", {
          headers: { "x-auth-token": token },
        });
        // setClassrooms(response.data);
        const userClassrooms = response.data.filter((classroom) =>
          classroom.users.some((user) => user._id === userOne._id)
        );
        setMyClassrooms(userClassrooms);
      } catch (error) {
        setError("Error Fetching Classrooms. Please try again..");
      } finally {
        setLoading(false);
      }
    };
    fetchClassrooms();
  }, [userOne._id]);

  // const handleClick = () => {
  //   setClicked(!clicked);
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://unihelper.onrender.com/api/classrooms/create-classroom",
        {
          title,
          name,
          semester,
          creator: userOne._id,
        },
        { headers: { "x-auth-token": token } }
      );

      if (response.status === 201) {
        const newClassroom = response.data.classroom;
        setSuccess("Classroom created successfully");
        // setClassrooms((prevClassroom) => [...prevClassroom, newClassroom]);

        setMyClassrooms((prevMyClassrooms) => {
          if (
            newClassroom.creator === userOne._id ||
            newClassroom.users.some((user) => user._id === userOne._id)
          ) {
            return [...prevMyClassrooms, newClassroom];
          }
          return prevMyClassrooms;
        });
      }
    } catch (error) {
      setError("Error creating classroom. Please try again.");
    } finally {
      setFormData({ title: "", name: "", semester: "" });
      setTimeout(() => setSuccess(""), 2000);
      setTimeout(() => setError(""), 2000);
    }
  };

  const handleDelete = async (classroomId) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `https://unihelper.onrender.com/api/classrooms/delete-classroom/${classroomId}`,
      { data: { userId: userOne._id }, headers: { "x-auth-token": token } }
    );

    if (response.status === 200) {
      // setClassrooms((prevClassrooms) =>
      //   prevClassrooms.filter((classroom) => classroom._id !== classroomId)
      // );

      setMyClassrooms((prevMyClassrooms) =>
        prevMyClassrooms.filter((classroom) => classroom._id !== classroomId)
      );
    }
  };

  const handleDropdownClick = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleOutsideClick = (e) => {
    if (
      !e.target.closest(".classroom-inner-option") &&
      !e.target.closest(".classroom-vertical-menu")
    ) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
                {error && (
                  <p
                    className="operation-statement"
                    style={{ color: "red", textAlign: "center" }}
                  >
                    {error}
                  </p>
                )}
                {success && (
                  <p
                    className="operation-statement"
                    style={{ color: "green", textAlign: "center" }}
                  >
                    {success}
                  </p>
                )}
              </form>
              {/* <span>Create Classroom</span> */}
            </div>
          </>
        )}

        {loading ? (
          <>
            <div className="loader-container-actual1">
              <Loader />
            </div>
          </>
        ) : (
          <>
            {myClassrooms.length > 0 ? (
              <>
                <div className="classroom-classes-container">
                  {myClassrooms.map((classroom) => (
                    <div
                      key={classroom._id}
                      className="classroom-individual-class"
                    >
                      <div className="classroom-top-section">
                        {/* <img src="" alt="Classroom Owner" /> */}
                        <div className="classroom-owner-picture-alter">
                          <p>{classroom.name[0]}</p>
                        </div>
                        <div className="classroom-vertical-menu-div">
                          <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            className="classroom-vertical-menu"
                            onClick={() => handleDropdownClick(classroom._id)}
                          />
                          <div
                            className={
                              openDropdown === classroom._id
                                ? "classroom-inner-option"
                                : "classroom-inner-option-not-active"
                            }
                          >
                            <Link
                              to="#"
                              className="classroom-inner-option-link"
                            >
                              Unenroll
                            </Link>
                            {userOne.status === "teacher" && (
                              <Link
                                to="#"
                                className="classroom-inner-option-link"
                                onClick={() => handleDelete(classroom._id)}
                              >
                                Delete
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/classroom/${classroom._id}`}
                        className="classroom-bottom-section"
                      >
                        <span className="classroom-couseCode">
                          {classroom.title}
                        </span>
                        <span className="classroom-courseName">
                          {classroom.name}
                        </span>
                        <span className="classroom-semester">
                          {classroom.semester}
                        </span>
                        <span className="classroom-created">
                          Created: {formatDate(classroom.createdAt)}
                        </span>
                      </Link>
                    </div>
                  ))}
                  {/* <Link to="" className="classroom-individual-class">
            <div className="classroom-top-section">
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
          </Link> */}
                </div>
              </>
            ) : (
              <>
                <div className="no-classroom-available-for-you">
                  {userOne.status === "teacher" ? (
                    <>
                      {" "}
                      <div className="text">Create Classroom</div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="text">No Classroom</div>
                      <div className="text">is Assigned</div>
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Classroom;
