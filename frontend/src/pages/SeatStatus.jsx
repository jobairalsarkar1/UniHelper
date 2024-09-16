import { useEffect, useState } from "react";
import { SearchThings } from "../components";
import { timeConverter } from "../utils";
import axios from "axios";
import "../styles/Advising.css";
import "../styles/Components.css";

const SeatStatus = () => {
  const [sections, setSections] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/courses/get-sections", {
          headers: { "x-auth-token": token },
        });
        if (response.data) {
          const validSections = response.data.filter(
            (item) =>
              item.course && item.course.courseCode && item.sectionNumber
          );

          const sortedSections = validSections.sort((a, b) => {
            const courseCodeA = a.course.courseCode;
            const courseCodeB = b.course.courseCode;
            if (courseCodeA < courseCodeB) return -1;
            if (courseCodeA > courseCodeB) return 1;
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
                  {searchedResults?.map((section, index) => (
                    <ul
                      key={section._id}
                      className={
                        index % 2
                          ? "seatStatus-info-list-inner custom-bg-1"
                          : "seatStatus-info-list-inner custom-bg-3"
                      }
                    >
                      <li className="seatStatus-info-items seatStatus-info-item-id">
                        {section.sectionNumber}
                      </li>
                      <li className="seatStatus-info-items">
                        {section.course.courseCode}
                      </li>
                      <li className="seatStatus-info-items">
                        {`(${section.schedule.days.join(", ").toUpperCase()})`}{" "}
                        {timeConverter(section.schedule.startTime)}-
                        {timeConverter(section.schedule.endTime)}
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
                  {sections?.map((section, index) => (
                    <ul
                      key={section._id}
                      className={
                        index % 2
                          ? "seatStatus-info-list-inner custom-bg-1"
                          : "seatStatus-info-list-inner custom-bg-3"
                      }
                    >
                      <li className="seatStatus-info-items seatStatus-info-item-id">
                        {section.sectionNumber}
                      </li>
                      <li className="seatStatus-info-items">
                        {section.course.courseCode}
                      </li>
                      <li className="seatStatus-info-items">
                        {/* {section.schedule.days.join(", ").toUpperCase()}{" "} */}
                        {`(${section.schedule.days.join(", ").toUpperCase()})`}{" "}
                        {timeConverter(section.schedule.startTime)}-
                        {timeConverter(section.schedule.endTime)}
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
