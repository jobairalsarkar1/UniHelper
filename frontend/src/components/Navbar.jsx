import { useContext, useEffect, useState } from "react";
import { faBars, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import ProfilePicture from "../assets/EditedC2.jpg";
import "../styles/Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const { isLoggedIn, logout, userOne } = useContext(AuthContext);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  // useEffect(() => {
  //   if (userOne.profileImage) {
  //     setProfileLoaded(true);
  //   }
  // }, [userOne.profileImage]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    toggleSidebar();
  };

  const handleClick = () => {
    setClicked(!clicked);
    console.log(clicked);
  };

  const nameSplit = () => {
    const name = userOne.name.split(" ");
    return `${name[0]} ${name[1]}`;
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
              <div className="loggedin-user-info" onClick={handleClick}>
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

                <span className="loggedin-user-name">{nameSplit()}</span>
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="loggedin-user-button"
                />
                <div
                  className={
                    clicked
                      ? "loggedin-user-hidden-menu"
                      : "loggedin-user-hidden-menu-not-active"
                  }
                >
                  <Link to="/dashboard" className="loggedin-item-link">
                    Dashboard
                  </Link>
                  {/* <hr /> */}
                  <Link
                    to="#"
                    className="loggedin-item-link"
                    onClick={handleLogout}
                  >
                    Logout
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
