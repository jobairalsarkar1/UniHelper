import { useContext, useState } from "react";
import "../styles/SideNav.css";
import { Link } from "react-router-dom";
import {
  faArrowRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../contexts/AuthContext";

const SideNav = ({ sidebarOpen, toggleSidebar }) => {
  const [expand, setExpand] = useState({
    users: false,
    account: false,
    advising: false,
    facilities: false,
  });
  const { isLoggedIn, userOne } = useContext(AuthContext);

  return (
    <>
      <div
        className={
          isLoggedIn && sidebarOpen ? "side-navbar active" : "side-navbar"
        }
      >
        <ul className="side-navbar-list">
          {userOne?.status === "admin" && (
            <>
              <li
                className="side-navbar-list-item"
                onClick={() => {
                  expand.users == false
                    ? setExpand({
                        ...expand,
                        users: true,
                        account: false,
                        advising: false,
                        facilities: false,
                      })
                    : setExpand({ ...expand, users: false });
                }}
              >
                <span>
                  Users
                  {expand.users == true ? (
                    <FontAwesomeIcon icon={faMinus} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}
                </span>
                <ul
                  className={
                    expand.users
                      ? "side-navbar-inner-list active"
                      : "side-navbar-inner-list"
                  }
                >
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/new-users"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      New Users
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/existing-users"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Existing Users
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="side-navbar-list-item sidenav-item-hover">
                <Link
                  to="/admin-courses"
                  className="side-navbar-item-link"
                  onClick={() => toggleSidebar()}
                >
                  Courses
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
              <li className="side-navbar-list-item sidenav-item-hover">
                <Link
                  to="/admin-departments"
                  className="side-navbar-item-link"
                  onClick={() => toggleSidebar()}
                >
                  Departments
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
              <li className="side-navbar-list-item sidenav-item-hover">
                <Link
                  to="/admin-advising"
                  className="side-navbar-item-link"
                  onClick={() => toggleSidebar()}
                >
                  Advising
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
              <li className="side-navbar-list-item sidenav-item-hover">
                <Link
                  to="/gradesheet"
                  className="side-navbar-item-link"
                  onClick={() => toggleSidebar()}
                >
                  GradeSheets
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
              {/* <li className="side-navbar-list-item sidenav-item-hover">
                <Link
                  to="/finance"
                  className="side-navbar-item-link"
                  onClick={() => toggleSidebar()}
                >
                  PaySlip
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li> */}
            </>
          )}

          {userOne?.status === "student" && (
            <>
              <li
                className="side-navbar-list-item"
                onClick={() => {
                  expand.account == false
                    ? setExpand({
                        ...expand,
                        users: false,
                        account: true,
                        advising: false,
                        facilities: false,
                      })
                    : setExpand({ ...expand, account: false });
                }}
              >
                <span>
                  Account
                  {expand.account == true ? (
                    <FontAwesomeIcon icon={faMinus} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}
                </span>
                <ul
                  className={
                    expand.account
                      ? "side-navbar-inner-list active"
                      : "side-navbar-inner-list"
                  }
                >
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/profile"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Profile
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/course-sequence"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Course Sequence
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/gradesheet"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      GradeSheet
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className="side-navbar-list-item"
                onClick={() => {
                  expand.advising == false
                    ? setExpand({
                        ...expand,
                        users: false,
                        account: false,
                        advising: true,
                        facilities: false,
                      })
                    : setExpand({ ...expand, advising: false });
                }}
              >
                <span>
                  Advising
                  {expand.advising == true ? (
                    <FontAwesomeIcon icon={faMinus} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}
                </span>
                <ul
                  className={
                    expand.advising
                      ? "side-navbar-inner-list active"
                      : "side-navbar-inner-list"
                  }
                >
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/advising-pannel"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Pannel
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/seat-status"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Seat Status
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/courses-details"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Course Details
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/advised-courses"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Advised Courses
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="side-navbar-list-item sidenav-item-hover">
                <Link
                  to="/classroom"
                  className="side-navbar-item-link"
                  onClick={() => toggleSidebar()}
                >
                  Classroom
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
              <li className="side-navbar-list-item sidenav-item-hover">
                <Link
                  to="/consultations"
                  className="side-navbar-item-link"
                  onClick={() => toggleSidebar()}
                >
                  Consultation
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
              <li className="side-navbar-list-item sidenav-item-hover">
                <Link
                  to="/finance"
                  className="side-navbar-item-link"
                  onClick={() => toggleSidebar()}
                >
                  Finance
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
              <li
                className="side-navbar-list-item"
                onClick={() => {
                  expand.facilities == false
                    ? setExpand({
                        ...expand,
                        users: false,
                        account: false,
                        advising: false,
                        facilities: true,
                      })
                    : setExpand({ ...expand, facilities: false });
                }}
              >
                <span>
                  Facilities
                  {expand.facilities == true ? (
                    <FontAwesomeIcon icon={faMinus} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}
                </span>
                <ul
                  className={
                    expand.facilities
                      ? "side-navbar-inner-list active"
                      : "side-navbar-inner-list"
                  }
                >
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/scholarship"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Scholarship
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/medical-help"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Medical Help
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          )}

          {userOne?.status === "teacher" && (
            <>
              {" "}
              <li
                className="side-navbar-list-item"
                onClick={() => {
                  expand.account == false
                    ? setExpand({
                        ...expand,
                        users: false,
                        account: true,
                        advising: false,
                        facilities: false,
                      })
                    : setExpand({ ...expand, account: false });
                }}
              >
                <span>
                  Account
                  {expand.account == true ? (
                    <FontAwesomeIcon icon={faMinus} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}
                </span>
                <ul
                  className={
                    expand.account
                      ? "side-navbar-inner-list active"
                      : "side-navbar-inner-list"
                  }
                >
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/profile"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Profile
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className="side-navbar-list-item"
                onClick={() => {
                  expand.advising == false
                    ? setExpand({
                        ...expand,
                        users: false,
                        account: false,
                        advising: true,
                        facilities: false,
                      })
                    : setExpand({ ...expand, advising: false });
                }}
              >
                <span>
                  Advising
                  {expand.advising == true ? (
                    <FontAwesomeIcon icon={faMinus} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}
                </span>
                <ul
                  className={
                    expand.advising
                      ? "side-navbar-inner-list active"
                      : "side-navbar-inner-list"
                  }
                >
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/advising-pannel"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Pannel
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/seat-status"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Seat Status
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/courses-details"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Course Details
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/advised-courses"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Sections
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="side-navbar-list-item sidenav-item-hover">
                <Link
                  to="/classroom"
                  className="side-navbar-item-link"
                  onClick={() => toggleSidebar()}
                >
                  Classroom
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
              <li className="side-navbar-list-item sidenav-item-hover">
                <Link
                  to="/consultations"
                  className="side-navbar-item-link"
                  onClick={() => toggleSidebar()}
                >
                  Consultation
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
              <li
                className="side-navbar-list-item"
                onClick={() => {
                  expand.facilities == false
                    ? setExpand({
                        ...expand,
                        users: false,
                        account: false,
                        advising: false,
                        facilities: true,
                      })
                    : setExpand({ ...expand, facilities: false });
                }}
              >
                <span>
                  Facilities
                  {expand.facilities == true ? (
                    <FontAwesomeIcon icon={faMinus} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}
                </span>
                <ul
                  className={
                    expand.facilities
                      ? "side-navbar-inner-list active"
                      : "side-navbar-inner-list"
                  }
                >
                  <li className="side-navbar-inner-list-item">
                    <Link
                      to="/medical-help"
                      className="side-navbar-inner-item-link"
                      onClick={() => toggleSidebar()}
                    >
                      Medical Help
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default SideNav;
