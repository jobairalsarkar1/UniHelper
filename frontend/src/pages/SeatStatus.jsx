import { useEffect, useState } from "react";
import axios from "axios";
import { SearchThings } from "../components";
import "../styles/Advising.css";

const SeatStatus = () => {
  const [sections, setSections] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearchChange = (e) => {
    // e.preventDefault();
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchedResults = sections.filter((item) =>
          item.course.courseCode
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
        setSearchedResults(searchedResults);
      }, 500)
    );
  };

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/courses/get-sections", {
          headers: { "x-auth-token": token },
        });
        if (response.data) {
          const sortedSections = response.data.sort((a, b) => {
            if (a.course.courseCode < b.course.courseCode) return -1;
            if (a.course.courseCode > b.course.courseCode) return 1;
            return a.sectionNumber - b.sectionNumber;
          });
          setSections(sortedSections);
        }
      } catch (error) {
        alert("Error Fetching sections.");
      }
    };
    fetchSections();
  }, []);

  // console.log(sections);

  return (
    <div className="seatStatus-container">
      <div className="seatStatus-inner-container">
        <div className="seatStatus-search-bar">
          <SearchThings
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
        </div>
        <div className="seatStatus-sections-list">
          <span className="seatStatus-title">
            Section Seat & Schedule Details:
          </span>
          <ul className="seatStatus-info-list">
            <li className="seatStatus-list-header seatStatus-info-items seatStatus-info-item-id">
              Section
            </li>
            <li className="seatStatus-list-header seatStatus-info-items">
              Course Code
            </li>
            <li className="seatStatus-list-header seatStatus-info-items">
              Time
            </li>
            <li className="seatStatus-list-header seatStatus-info-items">
              Seat Remaining
            </li>
            <li className="seatStatus-list-header seatStatus-info-items">
              Seat Booked
            </li>
          </ul>
          {searchText ? (
            <>
              {searchedResults?.length > 0 ? (
                <>
                  {" "}
                  {searchedResults.map((section) => (
                    <ul
                      key={section._id}
                      className="seatStatus-info-list-inner"
                    >
                      <li className="seatStatus-info-items seatStatus-info-item-id">
                        {section.sectionNumber}
                      </li>
                      <li className="seatStatus-info-items">
                        {section.course.courseCode}
                      </li>
                      <li className="seatStatus-info-items">
                        {section.schedule.day.toUpperCase()}{" "}
                        {section.schedule.startTime}-{section.schedule.endTime}
                      </li>
                      <li className="seatStatus-info-items">
                        {section.seat
                          ? section.seat - section.students.length
                          : "Null"}
                      </li>
                      <li className="seatStatus-info-items">
                        {section.students.length}
                      </li>
                    </ul>
                  ))}
                </>
              ) : (
                <>
                  {" "}
                  <p className="no-course-found">No Searched Course Found</p>
                </>
              )}
            </>
          ) : (
            <>
              {" "}
              {sections?.length > 0 ? (
                <>
                  {" "}
                  {sections.map((section) => (
                    <ul
                      key={section._id}
                      className="seatStatus-info-list-inner"
                    >
                      <li className="seatStatus-info-items seatStatus-info-item-id">
                        {section.sectionNumber}
                      </li>
                      <li className="seatStatus-info-items">
                        {section.course.courseCode}
                      </li>
                      <li className="seatStatus-info-items">
                        {section.schedule.day.toUpperCase()}{" "}
                        {section.schedule.startTime}-{section.schedule.endTime}
                      </li>
                      <li className="seatStatus-info-items">
                        {section.seat
                          ? section.seat - section.students.length
                          : "Null"}
                      </li>
                      <li className="seatStatus-info-items">
                        {section.students.length}
                      </li>
                    </ul>
                  ))}
                </>
              ) : (
                <>
                  {" "}
                  <p className="no-course-found">No Courses Found</p>
                </>
              )}
            </>
          )}
          {/* {sections?.length > 0 ? (
            <>
              {" "}
              {sections.map((section) => (
                <ul key={section._id} className="seatStatus-info-list-inner">
                  <li className="seatStatus-info-items seatStatus-info-item-id">
                    {section.sectionNumber}
                  </li>
                  <li className="seatStatus-info-items">
                    {section.course.courseCode}
                  </li>
                  <li className="seatStatus-info-items">
                    {section.schedule.day.toUpperCase()}{" "}
                    {section.schedule.startTime}-{section.schedule.endTime}
                  </li>
                  <li className="seatStatus-info-items">
                    {section.seat
                      ? section.seat - section.students.length
                      : "Null"}
                  </li>
                  <li className="seatStatus-info-items">
                    {section.students.length}
                  </li>
                </ul>
              ))}
            </>
          ) : (
            <>
              {" "}
              <p>No Courses Found</p>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SeatStatus;
