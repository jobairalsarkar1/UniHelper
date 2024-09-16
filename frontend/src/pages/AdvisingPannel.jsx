import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Schedule, SearchThings } from "../components";
import { dayFull, decorateFaculty, timeConverter } from "../utils";
import axios from "axios";
import "../styles/Advising.css";

const AdvisingPannel = () => {
  const { userOne } = useContext(AuthContext);
  const [sections, setSections] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [sectionDetails, setSectionDetails] = useState(null);
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/courses/get-sections", {
          headers: { "x-auth-token": token },
        });

        if (response.status === 200) {
          const sortedSectons = response.data.sort(
            (a, b) => a.sectionNumber - b.sectionNumber
          );
          setSections(sortedSectons);
        }
      } catch (error) {
        console.error("Something went wrong.");
      }
    };
    fetchSections();
  }, []);

  const handleSearchChange = (e) => {
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

  const addCourse = (sectionId) => {
    const selectedSection = sections.find(
      (section) => section._id === sectionId
    );
    if (selectedSection) {
      setSelectedCourses((prevSection) => [...prevSection, selectedSection]);
      setSearchedResults((prevSections) =>
        prevSections.filter((section) => section._id !== sectionId)
      );
      // setSections(sections.filter((section) => section._id !== sectionId));
    }
  };

  const dropCourse = (sectionId) => {
    const selectedSection = sections.find(
      (section) => section._id === sectionId
    );
    if (selectedSection) {
      setSearchedResults((prevSection) => [...prevSection, selectedSection]);
      // setSections((prevSection) => [...prevSection, selectedSection]);
      setSelectedCourses((prevSections) =>
        prevSections.filter((section) => section._id !== sectionId)
      );
    }
  };

  const handleDetailsClick = (sectionId) => {
    const clickedSection = sections.find(
      (section) => section._id === sectionId
    );
    setSectionDetails(clickedSection);
  };

  return (
    <div className="advising-pannel-container">
      <div className="advising-pannel-inner-container">
        {isEligible ? (
          <>
            <div className="advising-pannel-student-info">
              <div className="advising-pannel-first-info advising-pannel-name-semester">
                <p>
                  Name: <span>{userOne.name}</span>
                </p>
                <p>
                  ID: <span>{userOne.ID}</span>
                </p>
                <p>
                  Semester: <span>Spring2024</span>
                </p>
              </div>
              <div className="advising-pannel-first-info advising-pannel-attempted-credit">
                <p>
                  Attempted Credit: <span>84</span>
                </p>
                <p>
                  Completed Credit: <span>84</span>
                </p>
              </div>
              <div className="advising-pannel-first-info advising-pannel-name-semester">
                <p>
                  Allowed Credit(Max): <span>12</span>
                </p>
                <p>
                  Allowed Credit(min): <span>9</span>
                </p>
              </div>
            </div>
            <div className="advising-pannel-window">
              <span className="advising-pannel-title-01">Advising Pannel</span>
              <div className="advising-pannel-search-bar">
                <SearchThings
                  searchText={searchText}
                  handleSearchChange={handleSearchChange}
                />
              </div>
              <div className="advising-pannel-course-selection">
                <div className="advising-pannel-select-course">
                  <p>Select Courses:</p>
                  <ul className="advising-pannel-courses">
                    {searchedResults?.map((section) => (
                      <li
                        key={section._id}
                        className="advising-pannel-course"
                        onClick={() => handleDetailsClick(section._id)}
                      >
                        <span className="advising-course-info">
                          {`${section.course.courseCode}-${
                            section.faculty
                              ? decorateFaculty(section.faculty.name)
                              : "TBA"
                          }[${section.sectionNumber}]-[${section.classRoom}]`}
                          {/* CSE470-TBA[03]-[10A08C] */}
                        </span>
                        <button
                          type="button"
                          className="advising-course-add-btn"
                          onClick={() => addCourse(section._id)}
                        >
                          Add
                        </button>
                      </li>
                    ))}
                  </ul>
                  {/* <ul className="advising-pannel-courses">
                <li className="advising-pannel-course">
                  <span className="advising-course-info">
                    CSE470-TBA[03]-[10A08C]
                  </span>
                  <button type="button" className="advising-course-add-btn">
                    Add
                  </button>
                </li>
              </ul> */}
                </div>
                <div className="advising-pannel-select-course">
                  <p>Selected Courses:</p>

                  <ul className="advising-pannel-courses">
                    {selectedCourses?.map((section) => (
                      <li
                        key={section._id}
                        className="advising-pannel-course"
                        // onClick={() => handleDetailsClick(section._id)}
                      >
                        <span className="advising-course-info">
                          {`${section.course.courseCode}-${
                            section.faculty
                              ? decorateFaculty(section.faculty.name)
                              : "TBA"
                          }[${section.sectionNumber}]-[${section.classRoom}]`}
                          {/* CSE470-TBA[07]-[10A09C] */}
                        </span>
                        <button
                          type="button"
                          className="advising-course-drop-btn"
                          onClick={() => dropCourse(section._id)}
                        >
                          Drop
                        </button>
                      </li>
                    ))}
                  </ul>
                  {/* <ul className="advising-pannel-courses">
                <li className="advising-pannel-course">
                  <span className="advising-course-info">
                    CSE470-TBA[07]-[10A09C]
                  </span>
                  <button type="button" className="advising-course-drop-btn">
                    Drop
                  </button>
                </li>
              </ul> */}
                </div>
                <div className="advising-pannel-course-sechedule">
                  <p>Course Details:</p>
                  <div className="advising-pannel-course-time">
                    {sectionDetails && (
                      <>
                        <span>
                          Course:{" "}
                          <strong>{sectionDetails.course.courseCode}</strong>
                        </span>
                        <span>
                          Section:{" "}
                          <strong>{sectionDetails.sectionNumber}</strong>
                        </span>
                        <span>
                          Faculty:{" "}
                          {sectionDetails.faculty ? (
                            <>
                              <strong>{sectionDetails.faculty.name}</strong>
                            </>
                          ) : (
                            <>
                              <strong>TBA</strong>
                            </>
                          )}
                        </span>
                        <span>
                          Room: <strong>{sectionDetails.classRoom}</strong>
                        </span>
                        <span>
                          Day/Time:{" "}
                          <strong className="day-time-multiple">
                            {sectionDetails.schedule.days?.map((day, index) => (
                              <div key={index}>
                                {dayFull(day.toLowerCase())}
                              </div>
                            ))}
                            {/* {dayFull(sectionDetails.schedule.day.toLowerCase())}{" "} */}
                            {/* {`(${timeConverter(
                        sectionDetails.schedule.startTime
                      )}-${timeConverter(sectionDetails.schedule.endTime)})`} */}
                          </strong>
                        </span>
                        <span>
                          Class Time:{" "}
                          <strong>
                            {`${timeConverter(
                              sectionDetails.schedule.startTime
                            )}-${timeConverter(
                              sectionDetails.schedule.endTime
                            )}`}
                          </strong>
                        </span>
                        {sectionDetails.lab.dayL !== null ? (
                          <>
                            <span>
                              Lab Room:{" "}
                              <strong>{sectionDetails.lab?.roomL}</strong>
                            </span>
                            <span>
                              Lab:{" "}
                              <strong>
                                {`${dayFull(
                                  sectionDetails.lab.dayL?.toLowerCase()
                                )} (${timeConverter(
                                  sectionDetails.lab.startTimeL
                                )}-${timeConverter(
                                  sectionDetails.lab.endTimeL
                                )})`}
                              </strong>
                            </span>
                          </>
                        ) : null}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="advising-pannel-semester-routine">
              <span>Class Schedule:</span>
              <div className="advising-pannel-class-schedule">
                <Schedule />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="advising-pannel-not-eligible">
              <span>
                Seems like your Advising Period is Expired or It is not
                Scheduled yet.{" "}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdvisingPannel;
