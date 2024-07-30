import React, { useState } from "react";
import "../styles/SideNav.css";
import { Link } from "react-router-dom";
import {
  faArrowRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideNav = (props) => {
  const [expand, setExpand] = useState({
    account: false,
    advising: false,
    facilities: false,
  });
  return (
    <>
      <div
        className={props.sidebarOpen ? "side-navbar" : "side-navbar-not-active"}
      >
        <ul className="side-navbar-list">
          <li
            className="side-navbar-list-item"
            onClick={() => {
              expand.account == false
                ? setExpand({
                    ...expand,
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
                  ? "side-navbar-inner-list-active"
                  : "side-navbar-inner-list"
              }
            >
              <li className="side-navbar-inner-list-item">
                <Link to="/profile" className="side-navbar-inner-item-link">
                  Profile
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
              <li className="side-navbar-inner-list-item">
                <Link
                  to="/course-sequence"
                  className="side-navbar-inner-item-link"
                >
                  Course Sequence
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
              <li className="side-navbar-inner-list-item">
                <Link to="/gradesheet" className="side-navbar-inner-item-link">
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
                  ? "side-navbar-inner-list-active"
                  : "side-navbar-inner-list"
              }
            >
              <li className="side-navbar-inner-list-item">
                <Link to="/pannel" className="side-navbar-inner-item-link">
                  Pannel
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
              <li className="side-navbar-inner-list-item">
                <Link
                  to="/course-details"
                  className="side-navbar-inner-item-link"
                >
                  Course Details
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
              <li className="side-navbar-inner-list-item">
                <Link
                  to="/class-schedule"
                  className="side-navbar-inner-item-link"
                >
                  Class Schedule
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
            </ul>
          </li>
          <li className="side-navbar-list-item sidenav-item-hover">
            <Link to="/courses" className="side-navbar-item-link">
              Courses
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </li>
          <li className="side-navbar-list-item sidenav-item-hover">
            <Link to="/consultations" className="side-navbar-item-link">
              Consultation
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </li>
          <li className="side-navbar-list-item sidenav-item-hover">
            <Link to="/finance" className="side-navbar-item-link">
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
                  ? "side-navbar-inner-list-active"
                  : "side-navbar-inner-list"
              }
            >
              <li className="side-navbar-inner-list-item">
                <Link to="/scholarship" className="side-navbar-inner-item-link">
                  Scholarship
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
              <li className="side-navbar-inner-list-item">
                <Link
                  to="/medical-help"
                  className="side-navbar-inner-item-link"
                >
                  Medical Help
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideNav;
