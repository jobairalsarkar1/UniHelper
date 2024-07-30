import React, { useContext } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div>
        <nav className="top-navbar">
          <div className="logo-menu">
            {isLoggedIn && (
              <FontAwesomeIcon
                icon={faBars}
                className="toggle-sidebar-menu-active"
                onClick={toggleSidebar}
              />
            )}

            <Link to="/" className="logo">
              UniHelper
            </Link>
          </div>
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
            {isLoggedIn ? (
              <Link to="#" onClick={handleLogout} className="logout-button">
                Logout
              </Link>
            ) : (
              <Link to="/login" className="login-button">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
