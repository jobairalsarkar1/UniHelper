// import React from "react";
import "../styles/Components.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-inner-container">
        <div className="notfound-content">
          <div className="fof-design">
            <span className="f-first">4</span>
            <span className="o">0</span>
            <span className="f-last">4</span>
          </div>
          <p className="notfound-text">Ops!!!! Looks like this page do not exists.</p>
          <a href="/" className="back-to-previous">
            Back to Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
