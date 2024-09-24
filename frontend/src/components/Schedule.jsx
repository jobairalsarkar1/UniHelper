import { useEffect, useState } from "react";
import { timeConverter2, decorateFaculty } from "../utils";
import "../styles/Components.css";

const Schedule = ({ selectedSections }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    if (selectedSections) {
      const schedule = processSchedule(selectedSections);
      setTimeSlots(schedule.timeSlots);
      setScheduleData(schedule.grid);
    }
  }, [selectedSections]);

  // const processSchedule = (sections) => {
  //   const timeSlots = new Set();
  //   const grid = {};
  //   sections.forEach((section) => {
  //     const { schedule, lab, course, faculty, classRoom } = section;
  //     schedule.days.forEach((day) => {
  //       const timeSlot = `${timeConverter2(
  //         schedule.startTime
  //       )}-${timeConverter2(schedule.endTime)}`;
  //       timeSlots.add(timeSlot);
  //       if (!grid[timeSlot]) grid[timeSlot] = {};
  //       const facultyInitial = faculty ? decorateFaculty(faculty.name) : "TBA";
  //       grid[timeSlot][
  //         day
  //       ] = `${course.courseCode}-${facultyInitial}-${classRoom}`;
  //     });

  //     if (lab && lab.dayL) {
  //       const startTimeL = timeConverter2(lab.startTimeL);
  //       const endTimeL = timeConverter2(lab.endTimeL);

  //       // Calculate the total duration
  //       const labStart = new Date(`1970/01/01 ${startTimeL}`);
  //       const labEnd = new Date(`1970/01/01 ${endTimeL}`);
  //       const labDurationInMinutes = (labEnd - labStart) / (1000 * 60); // in minutes

  //       // Calculate midpoint time
  //       const midpoint = new Date(
  //         labStart.getTime() + (labDurationInMinutes / 2) * 60000
  //       );
  //       const midpointTime = midpoint.toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //         hour12: true,
  //       });

  //       // Create two slots
  //       const labTimeSlot1 = `${timeConverter2(startTimeL)}-${midpointTime}`;
  //       const labTimeSlot2 = `${midpointTime}-${timeConverter2(endTimeL)}`;

  //       timeSlots.add(labTimeSlot1);
  //       timeSlots.add(labTimeSlot2);
  //       if (!grid[labTimeSlot1]) grid[labTimeSlot1] = {};
  //       if (!grid[labTimeSlot2]) grid[labTimeSlot2] = {};

  //       grid[labTimeSlot1][
  //         lab.dayL.toUpperCase()
  //       ] = `Lab-${course.courseCode}-${lab.roomL}`;
  //       grid[labTimeSlot2][
  //         lab.dayL.toUpperCase()
  //       ] = `Lab-${course.courseCode}-${lab.roomL}`;
  //     }
  //   });

  //   const sortedTimeSlots = Array.from(timeSlots).sort((a, b) => {
  //     const [startA] = a.split("-");
  //     const [startB] = b.split("-");
  //     return (
  //       new Date(`1970/01/01 ${startA}`) - new Date(`1970/01/01 ${startB}`)
  //     );
  //   });
  //   return { timeSlots: sortedTimeSlots, grid };
  // };

  const processSchedule = (sections) => {
    const timeSlots = new Set();
    const grid = {};

    sections.forEach((section) => {
      const { schedule, lab, course, faculty, classRoom } = section;

      // Process regular class schedules
      schedule.days.forEach((day) => {
        const timeSlot = `${timeConverter2(
          schedule.startTime
        )}-${timeConverter2(schedule.endTime)}`;
        timeSlots.add(timeSlot);
        if (!grid[timeSlot]) grid[timeSlot] = {};
        const facultyInitial = faculty ? decorateFaculty(faculty.name) : "TBA";
        const entry = `${course.courseCode}-${facultyInitial}-${classRoom}`;

        // Concatenate if there's already an entry
        grid[timeSlot][day] = grid[timeSlot][day]
          ? `${grid[timeSlot][day]}, ${entry}`
          : entry;
      });

      // Handle lab scheduling
      if (lab && lab.dayL) {
        const startTimeL = timeConverter2(lab.startTimeL);
        const endTimeL = timeConverter2(lab.endTimeL);

        // Handle null lab times
        if (startTimeL && endTimeL) {
          const labDays = lab.dayL.toUpperCase();
          const labStart = new Date(`1970/01/01 ${startTimeL}`);
          const labEnd = new Date(`1970/01/01 ${endTimeL}`);
          const labDurationInMinutes = (labEnd - labStart) / (1000 * 60); // in minutes

          // Calculate midpoint time
          const midpoint = new Date(
            labStart.getTime() + (labDurationInMinutes / 2) * 60000
          );
          const midpointTime = midpoint.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          // Create two slots
          const labTimeSlot1 = `${timeConverter2(
            lab.startTimeL
          )}-${midpointTime}`;
          const labTimeSlot2 = `${midpointTime}-${timeConverter2(
            lab.endTimeL
          )}`;

          timeSlots.add(labTimeSlot1);
          timeSlots.add(labTimeSlot2);
          if (!grid[labTimeSlot1]) grid[labTimeSlot1] = {};
          if (!grid[labTimeSlot2]) grid[labTimeSlot2] = {};

          const labEntry = `Lab-${course.courseCode}-${lab.roomL}`;

          // Concatenate if there's already an entry
          grid[labTimeSlot1][labDays] = grid[labTimeSlot1][labDays]
            ? `${grid[labTimeSlot1][labDays]}, ${labEntry}`
            : labEntry;

          grid[labTimeSlot2][labDays] = grid[labTimeSlot2][labDays]
            ? `${grid[labTimeSlot2][labDays]}, ${labEntry}`
            : labEntry;
        }
      }
    });

    const sortedTimeSlots = Array.from(timeSlots).sort((a, b) => {
      const [startA] = a.split("-");
      const [startB] = b.split("-");
      return (
        new Date(`1970/01/01 ${startA}`) - new Date(`1970/01/01 ${startB}`)
      );
    });

    return { timeSlots: sortedTimeSlots, grid };
  };

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
      {/* <ul className="schedule-list-inner">
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
      </ul> */}
      {/* {timeSlots.map((timeSlot) => (
        <ul key={timeSlot} className="schedule-list-inner">
          <li className="schedule-items-inner schedule-item-id">{timeSlot}</li>
          <li className="schedule-items-inner">
            {scheduleData[timeSlot]?.SAT || ""}
          </li>
          <li className="schedule-items-inner">
            {scheduleData[timeSlot]?.SUN || ""}
          </li>
          <li className="schedule-items-inner">
            {scheduleData[timeSlot]?.MON || ""}
          </li>
          <li className="schedule-items-inner">
            {scheduleData[timeSlot]?.TUE || ""}
          </li>
          <li className="schedule-items-inner">
            {scheduleData[timeSlot]?.WED || ""}
          </li>
          <li className="schedule-items-inner">
            {scheduleData[timeSlot]?.THU || ""}
          </li>
          <li className="schedule-items-inner">
            {scheduleData[timeSlot]?.FRI || ""}
          </li>
        </ul>
      ))} */}
      {timeSlots.map((timeSlot) => (
        <ul key={timeSlot} className="schedule-list-inner">
          <li className="schedule-items-inner schedule-item-id">{timeSlot}</li>
          {["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"].map((day) => {
            const cellContent = scheduleData[timeSlot]?.[day] || "";
            const isClashing = cellContent.includes(","); // Check for clashes

            return (
              <li
                key={day}
                className="schedule-items-inner"
                style={{ color: isClashing ? "red" : "black" }} // Change text color if clashing
              >
                {cellContent}
              </li>
            );
          })}
        </ul>
      ))}
    </>
  );
};

export default Schedule;
