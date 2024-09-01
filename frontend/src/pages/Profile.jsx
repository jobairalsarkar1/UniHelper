import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Loader } from "../components";
import "../styles/Account.css";

const Profile = () => {
  const { userOne, tokens, isLoggedIn } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (userOne && userOne.profileImage) {
      setProfileImage(userOne.profileImage);
    }
  }, [userOne]);

  if (!userOne) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-inner-container">
        <h1>Profile</h1>
        <h1>{tokens}</h1>
        <h1>{isLoggedIn ? "yes" : "no"}</h1>
        <Loader />
        <h1>{userOne._id}</h1>
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {userOne.name}
          </p>
          <p>
            <strong>Email:</strong> {userOne.email}
          </p>
          <p>
            <strong>ID:</strong> {userOne.ID}
          </p>
          <p>
            <strong>ID:</strong> {userOne.status}
          </p>
          {/* Add more fields as needed */}
          {profileImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            <div>Loading image...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
