import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>
        <h1>Welcome to Home Page.</h1>
        <ul className="sample">
          <li className="sample-element">
            <Link to="/profile" className="sample-element-link">
              Profile
            </Link>
          </li>
          <li className="sample-element">
            <Link to="/user-advising" className="sample-element-link">
              Advising
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Home;
