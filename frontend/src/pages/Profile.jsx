import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Loader, Schedule } from "../components";
import axios from "axios";
import "../styles/Account.css";

const Profile = () => {
  const { userOne } = useContext(AuthContext);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [teachersSections, setTeachersSections] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [profileImage, setProfileImage] = useState(null);

  // useEffect(() => {
  //   if (userOne && userOne.profileImage) {
  //     setProfileImage(userOne.profileImage);
  //   }
  // }, [userOne]);

  // if (!userOne) {
  //   return <div>Loading...</div>;
  // }

  useEffect(() => {
    const fetchMyPanel = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/advising-panels/get-my-advisingpanel/${userOne._id}`,
          { headers: { "x-auth-token": token } }
        );
        if (response.status === 200) {
          setSelectedCourses(response.data.selectedSections);
        }
      } catch (error) {
        // alert(error.message);
        console.error(error.response?.data?.message);
      }
      setLoading(false);
    };
    fetchMyPanel();
  }, [userOne._id]);

  useEffect(() => {
    const fetchTeachersSections = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/advising-panels/me-teacher-sections/${userOne._id}`,
          { headers: { "x-auth-token": token } }
        );
        if (response.status === 200) {
          setTeachersSections(response.data);
        }
      } catch (error) {
        console.error(error.response?.data?.message);
      }
    };
    fetchTeachersSections();
  }, [userOne._id]);

  return (
    <div className="profile-container">
      <div className="profile-inner-container">
        {loading ? (
          <>
            <div className="loader-container-actual">
              <Loader />
            </div>
          </>
        ) : (
          <>
            <div className="profile-info-container">
              <div className="profile-info">
                <div className="profile-row">
                  <span className="profile-label">
                    Name <strong>:</strong>
                  </span>
                  <span className="profile-value">{`${userOne.name}`}</span>
                </div>
                <div className="profile-row">
                  <span className="profile-label">
                    Status <strong>:</strong>
                  </span>
                  <span className="profile-value">
                    {userOne.status.toUpperCase()[0] + userOne.status.slice(1)}
                  </span>
                </div>
                {userOne.status === "student" && (
                  <>
                    <div className="profile-row">
                      <span className="profile-label">
                        Student ID <strong>:</strong>
                      </span>
                      <span className="profile-value">{userOne.ID}</span>
                    </div>
                    <div className="profile-row">
                      <span className="profile-label">
                        Department <strong>:</strong>
                      </span>
                      <span className="profile-value">CSE</span>
                    </div>
                    {/* <div className="profile-row">
                  <span className="profile-label">Email</span>
                  <span className="profile-value">: {userOne.email}</span>
                </div> */}
                  </>
                )}
                {/* {userOne.status === "admin" && (
              <>
                <div className="profile-row">
                  <span className="profile-label">Email</span>
                  <span className="profile-value">: {userOne.email}</span>
                </div>
              </>
            )} */}
                <div className="profile-row">
                  <span className="profile-label">
                    Email <strong>:</strong>
                  </span>
                  <span className="profile-value">
                    <a href={`mailto:${userOne.email}`}>{userOne.email}</a>
                  </span>
                </div>
              </div>
              <div className="profile-picture-container">
                {userOne.profileImage ? (
                  <>
                    <img src={userOne.profileImage} alt="Profile Image" />
                  </>
                ) : (
                  <>
                    <div className="profile-picture-alternative">
                      {userOne.name[0]}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        <div
          style={{ marginTop: "1rem", backgroundColor: "#ffffff" }}
          className="schedule-holder-holder"
        >
          <span>Schedule</span>
          <div className="schedule-holder">
            {userOne.status === "student" ? (
              <>
                <Schedule selectedSections={selectedCourses} />
              </>
            ) : (
              <>
                <Schedule selectedSections={teachersSections} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
