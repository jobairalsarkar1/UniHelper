import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { userOne } = useContext(AuthContext);
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
      </div>
    </div>
  );
};

export default Profile;
