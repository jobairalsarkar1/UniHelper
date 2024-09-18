import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Loader } from "../components";
import "../styles/Account.css";

const Profile = () => {
  const { userOne } = useContext(AuthContext);
  // const [profileImage, setProfileImage] = useState(null);

  // useEffect(() => {
  //   if (userOne && userOne.profileImage) {
  //     setProfileImage(userOne.profileImage);
  //   }
  // }, [userOne]);

  // if (!userOne) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="profile-container">
      <div className="profile-inner-container">
        <div className="profile-info-container">
          <div className="profile-info">
            <div className="profile-row">
              <span className="profile-label">Name</span>
              <span className="profile-value">: {`${userOne.name}`}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Status</span>
              <span className="profile-value">
                : {userOne.status.toUpperCase()[0] + userOne.status.slice(1)}
              </span>
            </div>
            {userOne.status === "student" && (
              <>
                <div className="profile-row">
                  <span className="profile-label">Student ID</span>
                  <span className="profile-value">: {userOne.ID}</span>
                </div>
                <div className="profile-row">
                  <span className="profile-label">Department</span>
                  <span className="profile-value">: CSE</span>
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
              <span className="profile-label">Email</span>
              <span className="profile-value">
                : <a href={`mailto:${userOne.email}`}>{userOne.email}</a>
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
      </div>
    </div>
  );
};

export default Profile;
