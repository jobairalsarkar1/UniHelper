import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { userOne } = useContext(AuthContext);
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
      <h1>Profile</h1>
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
  );
};

export default Profile;
