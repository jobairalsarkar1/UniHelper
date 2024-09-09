import React from "react";
import { Link } from "react-router-dom";
import "../styles/External.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-inner-container">
        <h2>Home Page</h2>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
};

export default Home;
