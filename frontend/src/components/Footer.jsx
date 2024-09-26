// import React from "react";
import "../styles/Components.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-inner-container">
        <ul className="footer-items">
          <li className="footer-item">
            <a href="/courses-details" className="footer-item-link">
              Courses Details
            </a>
          </li>
          <li className="footer-item">
            <a href="/seat-status" className="footer-item-link">
              Seat Status
            </a>
          </li>
          <li className="footer-item">
            <a href="/contact" className="footer-item-link">
              Contact
            </a>
          </li>
        </ul>
        {/* <span>Footer</span> */}
      </div>
      <div className="liscence">&#169; Developed by Jobair Al Sarkar</div>
    </div>
  );
};

export default Footer;
