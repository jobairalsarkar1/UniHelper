import React from "react";
import "../styles/Components.css";

const Schedule = () => {
  return (
    <>
      <ul className="schedule-title-list">
        <li className="schedule-list-header schedule-items schedule-item-id">
          Time/Day
        </li>
        <li className="schedule-list-header schedule-items">SAT</li>
        <li className="schedule-list-header schedule-items">SUN</li>
        <li className="schedule-list-header schedule-items">MON</li>
        <li className="schedule-list-header schedule-items">TUE</li>
        <li className="schedule-list-header schedule-items">WED</li>
        <li className="schedule-list-header schedule-items">THU</li>
        <li className="schedule-list-header schedule-items">FRI</li>
      </ul>
      <ul className="schedule-list-inner">
        <li className="schedule-items-inner schedule-item-id">
          08:00 AM-09:20 AM
        </li>
        <li className="schedule-items-inner">CSE470-RHD-09D-17C</li>
        <li className="schedule-items-inner"></li>
        <li className="schedule-items-inner"></li>
        <li className="schedule-items-inner"></li>
        <li className="schedule-items-inner"></li>
        <li className="schedule-items-inner">CSE470-RHD-09D-17C</li>
        <li className="schedule-items-inner"></li>
      </ul>
    </>
  );
};

export default Schedule;
