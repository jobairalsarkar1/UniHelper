// import React from "react";
import { Link } from "react-router-dom";
import "../styles/Components.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-inner-container">
        <ul className="footer-items">
          <li className="footer-item">
            <Link to="/courses-details" className="footer-item-link">
              Courses Details
            </Link>
          </li>
          <li className="footer-item">
            <Link to="/seat-status" className="footer-item-link">
              Seat Status
            </Link>
          </li>
          <li className="footer-item">
            <Link to="/contact" className="footer-item-link">
              Contact
            </Link>
          </li>
        </ul>
        {/* <span>Footer</span> */}
      </div>
      <div className="liscence">
        <Link to="mailto:jobairalsarkar1@gmail.com">
          &#169; Developed by Jobair Al Sarkar
        </Link>
      </div>
    </div>
  );
};

export default Footer;
