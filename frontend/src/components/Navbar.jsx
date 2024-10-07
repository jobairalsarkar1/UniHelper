import { useContext, useEffect, useRef, useState } from "react";
import {
  faBars,
  faDashboard,
  faPerson,
  // faEllipsisVertical,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
// import ProfilePicture from "../assets/EditedC2.jpg";
import Unihelper from "../assets/Unihelper.svg";
import "../styles/Navbar.css";

const Navbar = ({ toggleSidebar, setSidebarOpen }) => {
  const { isLoggedIn, logout, userOne } = useContext(AuthContext);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const dropDownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    // toggleSidebar();
    setSidebarOpen(false);
  };

  const handleClick = () => {
    setClicked(!clicked);
    // console.log(clicked);
  };

  // const nameSplit = () => {
  //   const name = userOne.name.split(" ");
  //   return `${name[0]} ${name[1]}`;
  // };

  const handleOutsideClick = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setClicked(false);
    }
  };

  useEffect(() => {
    if (clicked) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [clicked]);

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
              UH
              {/* <img src={Unihelper} alt="logo" className="unihelper-logo" /> */}
            </Link>
          </div>
          {/* <ul className="top-navbar-list">
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
          </ul> */}
          <div className="authentication-div">
            {isLoggedIn ? (
              <div
                className="loggedin-user-info"
                onClick={handleClick}
                ref={dropDownRef}
              >
                {userOne.profileImage ? (
                  <>
                    <img
                      src={userOne.profileImage}
                      alt="Profile"
                      className="loggedin-user-profile-picture"
                    />
                  </>
                ) : (
                  <>
                    <div className="user-profile-picture-alter">
                      {userOne.name[0]}
                    </div>
                  </>
                )}

                {/* <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="loggedin-user-button"
                /> */}
                <div
                  className={
                    clicked
                      ? "loggedin-user-hidden-menu"
                      : "loggedin-user-hidden-menu-not-active"
                  }
                >
                  <div className="loggedin-user-info-inner">
                    {userOne.profileImage ? (
                      <>
                        <img
                          src={userOne.profileImage}
                          alt="Profile"
                          className="loggedin-user-profile-picture"
                        />
                      </>
                    ) : (
                      <>
                        <div className="user-profile-picture-alter">
                          {userOne.name[0]}
                        </div>
                      </>
                    )}
                    <div className="loggedin-user-status-name">
                      <span className="loggedin-user-name">{userOne.name}</span>
                      <p className="user-status">Status: {userOne.status}</p>
                    </div>
                  </div>
                  <hr />
                  <Link to="/profile" className="loggedin-item-link">
                    <FontAwesomeIcon icon={faUser} className="icon-x" />
                    <span>Profile</span>
                  </Link>
                  <Link to="/dashboard" className="loggedin-item-link">
                    <FontAwesomeIcon icon={faDashboard} className="icon-x" />
                    <span>Dashboard</span>
                  </Link>
                  {/* <hr /> */}
                  <Link
                    to="#"
                    className="loggedin-item-link"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faSignOut} className="icon-x" />
                    <span>Sign Out</span>
                  </Link>
                </div>
              </div>
            ) : (
              // <Link to="#" onClick={handleLogout} className="logout-button">
              //   Logout
              // </Link>
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
