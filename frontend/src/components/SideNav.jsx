import React, { useState } from "react";
import "../styles/SideNav.css";
import { Link } from "react-router-dom";
import {
  faArrowRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideNav = () => {
  const [expand, setExpand] = useState({
    account: false,
    advising: false,
    facilities: false,
  });
  return (
    <>
      <div className="side-navbar">
        <ul className="side-navbar-list">
          <li
            className="side-navbar-list-item"
            onClick={() => {
              expand.account == false
                ? setExpand({ ...expand, account: true })
                : setExpand({ ...expand, account: false });
            }}
          >
            Account
            {expand.account == true ? (
              <FontAwesomeIcon icon={faMinus} />
            ) : (
              <FontAwesomeIcon icon={faPlus} />
            )}
          </li>
          <li
            className="side-navbar-list-item"
            onClick={() => {
              expand.advising == false
                ? setExpand({ ...expand, advising: true })
                : setExpand({ ...expand, advising: false });
            }}
          >
            Advising
            {expand.advising == true ? (
              <FontAwesomeIcon icon={faMinus} />
            ) : (
              <FontAwesomeIcon icon={faPlus} />
            )}
          </li>
          <li className="side-navbar-list-item">
            <Link to="/courses" className="side-navbar-item-link">
              Courses
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </li>
          <li className="side-navbar-list-item">
            <Link to="/consultation" className="side-navbar-item-link">
              Consultation
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </li>
          <li className="side-navbar-list-item">
            <Link to="/finance" className="side-navbar-item-link">
              Finance
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </li>
          <li
            className="side-navbar-list-item"
            onClick={() => {
              expand.facilities == false
                ? setExpand({ ...expand, facilities: true })
                : setExpand({ ...expand, facilities: false });
            }}
          >
            Facilities
            {expand.facilities == true ? (
              <FontAwesomeIcon icon={faMinus} />
            ) : (
              <FontAwesomeIcon icon={faPlus} />
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideNav;
