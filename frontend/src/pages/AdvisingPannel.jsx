import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Schedule, SearchThings } from "../components";
import { dayFull, decorateFaculty, timeConverter } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../styles/Advising.css";

const AdvisingPannel = () => {
  const { userOne } = useContext(AuthContext);
  const [sections, setSections] = useState([]);
  const [myAdvisingPanel, setMyAdvisingPanel] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [sectionDetails, setSectionDetails] = useState(null);
  const [isEligible, setIsEligible] = useState(false);
  const [haveClash, setHaveClash] = useState(false);
  const [clashingSections, setClashingSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://unihelper.onrender.com/api/courses/get-sections", {
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

  useEffect(() => {
    const fetchMyPanel = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://unihelper.onrender.com/api/advising-panels/get-my-advisingpanel/${userOne._id}`,
          { headers: { "x-auth-token": token } }
        );
        if (response.status === 200) {
          setMyAdvisingPanel(response.data);
          setSelectedCourses(response.data.selectedSections);
          checkEligibility(
            response.data.advisingSlot,
            response.data.advisingStatus
          );
        }
      } catch (error) {
        // alert(error.message);
        console.error(error.response?.data?.message);
      }
    };
    fetchMyPanel();
  }, [userOne._id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (myAdvisingPanel.advisingSlot) {
        checkEligibility(myAdvisingPanel.advisingSlot);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [myAdvisingPanel]);

  const checkEligibility = (advisingSlot, advisingStatus) => {
    const currentTime = new Date();
    const advisingSlotDate = new Date(advisingSlot);
    const advisingSlotEnd = new Date(
      advisingSlotDate.getTime() + 60 * 60 * 1000
    );

    if (
      currentTime >= advisingSlotDate &&
      currentTime <= advisingSlotEnd &&
      advisingStatus === "pending"
    ) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchedResults = sections.filter(
          (item) =>
            item.course.courseCode
              .toLowerCase()
              .includes(searchText.toLowerCase()) &&
            !selectedCourses.some((selected) => selected._id === item._id)
        );
        setSearchedResults(searchedResults);
      }, 500)
    );
  };

  const addCourse = async (sectionId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://unihelper.onrender.com/api/advising-panels/add-course-section",
        { advisingPanelId: myAdvisingPanel._id, sectionId },
        { headers: { "x-auth-token": token } }
      );
      if (response.status === 200) {
        // setHaveClash(false);
        const addedSection = sections.find(
          (section) => section._id === sectionId
        );
        if (addedSection) {
          setSelectedCourses((prevSections) => [...prevSections, addedSection]);
          setSearchedResults((prevSections) =>
            prevSections.filter((section) => section._id !== sectionId)
          );
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setClashingSections(error.response.data);
        console.log(error.response.data.clashingSections);
        setHaveClash(true);
      } else {
        alert("Error Block" + error.message);
        console.error(error.message);
      }
    }
  };

  const dropCourse = async (sectionId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://unihelper.onrender.com/api/advising-panels/drop-course-section",
        { advisingPanelId: myAdvisingPanel._id, sectionId },
        { headers: { "x-auth-token": token } }
      );
      if (response.status === 200) {
        const droppedSection = selectedCourses.find(
          (section) => section._id === sectionId
        );
        if (droppedSection) {
          setSelectedCourses((prevSections) =>
            prevSections.filter((section) => section._id !== sectionId)
          );
          if (
            droppedSection.course.courseCode
              .toLowerCase()
              .includes(searchText.toLowerCase())
          ) {
            setSearchedResults((prevSections) => [
              ...prevSections,
              droppedSection,
            ]);
          }
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDetailsClick = (sectionId) => {
    const clickedSection = sections.find(
      (section) => section._id === sectionId
    );
    setSectionDetails(clickedSection);
  };

  return (
    <div className={`advising-pannel-container ${haveClash ? "blur" : ""}`}>
      {/* <div className="advising-pannel-container"> */}
      {haveClash && (
        <div
          className={
            haveClash ? "haveClash-container active" : "haveClash-container"
          }
        >
          <div className="clash-cancel-button">
            <FontAwesomeIcon
              icon={faXmark}
              className="fa-Xmark-btn"
              onClick={() => setHaveClash(false)}
            />
          </div>
          <div className="clash-text-holder">
            <span className="clash-text">{clashingSections.message}</span>
            <div className="clash-text-div">
              {clashingSections.clashingSections?.length > 0 && (
                <>
                  {clashingSections.clashingSections?.map((clash) => (
                    <li key={clash._id}>
                      <span>{clash.course.courseCode}</span>
                      <span>{`${timeConverter(
                        clash.schedule.startTime
                      )}-${timeConverter(clash.schedule.endTime)}`}</span>
                    </li>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="advising-pannel-inner-container">
        {isEligible ? (
          <>
            <div className="advising-pannel-student-info">
              <div className="advising-pannel-first-info advising-pannel-name-semester">
                <p>
                  Name:{" "}
                  <span>
                    {userOne.name === myAdvisingPanel.student.name &&
                      userOne.name}
                  </span>
                </p>
                <p>
                  ID:{" "}
                  <span>
                    {userOne.ID === myAdvisingPanel.student.ID && userOne.ID}
                  </span>
                </p>
                <p>
                  Semester: <span>{myAdvisingPanel.semester}</span>
                </p>
              </div>
              <div className="advising-pannel-first-info advising-pannel-attempted-credit">
                <p>
                  Attempted Credit:{" "}
                  <span>{myAdvisingPanel.completedCredits}</span>
                </p>
                <p>
                  Completed Credit:{" "}
                  <span>{myAdvisingPanel.completedCredits}</span>
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
                    {selectedCourses.map((section) => (
                      <li key={section._id} className="advising-pannel-course">
                        <span className="advising-course-info">
                          {`${section.course.courseCode}-${
                            section.faculty
                              ? decorateFaculty(section.faculty.name)
                              : "TBA"
                          }[${section.sectionNumber}]-[${section.classRoom}]`}
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
                <Schedule selectedSections={selectedCourses} />
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
