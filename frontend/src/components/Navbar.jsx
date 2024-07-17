import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <>
      <div>
        <nav className="top-navbar">
          <FontAwesomeIcon icon={faBars} className="toggle-sidebar-menu" />
          <Link to="/" className="logo">
            UniHelper
          </Link>
          <ul className="top-navbar-list">
            <li className="top-navbar-list-item">
              <Link to="/" className="top-navbar-item-link">
                Home
              </Link>
            </li>
            <li className="top-navbar-list-item">
              <Link to="/contact" className="top-navbar-item-link">
                Contact
              </Link>
            </li>
          </ul>
          <div className="authentication-div">
            <Link to="/login" className="login-button">
              Login
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
