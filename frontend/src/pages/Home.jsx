import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components";
import "../styles/External.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-inner-container">
        <h2>Home Page</h2>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
