import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import "../styles/Advising.css";

const AdvisedCourses = () => {
  const { userOne } = useContext(AuthContext);
  const [advisedCourses, setAdvisedCourses] = useState(null);
  const [teachersSections, setTeachersSections] = useState(null);

  useEffect(() => {
    const fetchAdvisedCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/advising-panels/get-my-advisingpanel/${userOne._id}`,
          { headers: { "x-auth-token": token } }
        );
        if (response.status === 200) {
          setAdvisedCourses(response.data.selectedSections);
          // console.log(response.data);
        }
      } catch (error) {
        // alert(error?.response?.data?.message);
        console.error(error?.response?.data?.message);
      }
    };
    if (userOne && userOne._id) {
      fetchAdvisedCourses();
    }
  }, [userOne, userOne._id]);

  useEffect(() => {
    const fetchTeachersSections = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/advising-panels/me-teacher-sections/${userOne._id}`,
          { headers: { "x-auth-token": token } }
        );
        if (response.status === 200) {
          setTeachersSections(response.data);
        }
      } catch (error) {
        console.error(error.response?.data?.message);
      }
    };
    fetchTeachersSections();
  }, [userOne._id]);

  console.log(advisedCourses);

  return (
    <div className="advised-courses-container">
      <div className="advised-courses-inner-container">
        {userOne.status === "student" && (
          <>
            <div className="advised-courses-list">
              <span className="advised-courses-title">Advised Courses</span>
              <ul className="advised-courses-info-list">
                <li className="advised-courses-list-header advised-courses-info-items advised-courses-info-item-id">
                  Section
                </li>
                <li className="advised-courses-list-header advised-courses-info-items">
                  Course Code
                </li>
                <li className="advised-courses-list-header advised-courses-info-items">
                  Course Title
                </li>
                <li className="advised-courses-list-header advised-courses-info-items">
                  Faculty
                </li>
                <li className="advised-courses-list-header advised-courses-info-items">
                  Room No
                </li>
              </ul>
              {advisedCourses ? (
                <>
                  {advisedCourses.map((course) => (
                    <ul
                      key={course._id}
                      className="advised-courses-info-list-inner"
                    >
                      <li className=" advised-courses-info-items advised-courses-info-item-id">
                        {course.sectionNumber}
                      </li>
                      <li className=" advised-courses-info-items">
                        {course.course.courseCode}
                      </li>
                      <li className=" advised-courses-info-items">
                        {course.course.name}
                      </li>
                      <li className=" advised-courses-info-items">
                        {course.faculty?.name
                          ? `${course.faculty.name.split(" ")[0][0]}${
                              course.faculty.name.split(" ")[1][0]
                            }${course.faculty.name.split(" ")[2][0]}`
                          : "TBA"}
                      </li>
                      <li className=" advised-courses-info-items">
                        {course.classRoom}
                      </li>
                    </ul>
                  ))}
                </>
              ) : (
                <>
                  <p className="no-course-found">No Courses are Advised</p>
                </>
              )}
            </div>
          </>
        )}
        {userOne.status === "teacher" && (
          <>
            <div className="advised-courses-list">
              <span className="advised-courses-title">Assigned Sections</span>
              <ul className="advised-courses-info-list">
                <li className="advised-courses-list-header advised-courses-info-items advised-courses-info-item-id">
                  Section
                </li>
                <li className="advised-courses-list-header advised-courses-info-items">
                  Course Code
                </li>
                <li className="advised-courses-list-header advised-courses-info-items">
                  Course Title
                </li>
                <li className="advised-courses-list-header advised-courses-info-items">
                  Students
                </li>
                <li className="advised-courses-list-header advised-courses-info-items">
                  Room No
                </li>
              </ul>
              {teachersSections.length > 0 ? (
                <>
                  {teachersSections.map((course) => (
                    <ul
                      key={course._id}
                      className="advised-courses-info-list-inner"
                    >
                      <li className=" advised-courses-info-items advised-courses-info-item-id">
                        {course.sectionNumber}
                      </li>
                      <li className=" advised-courses-info-items">
                        {course.course.courseCode}
                      </li>
                      <li className=" advised-courses-info-items">
                        {course.course.name}
                      </li>
                      <li className=" advised-courses-info-items">
                        {course.students.length}
                      </li>
                      <li className=" advised-courses-info-items">
                        {course.classRoom}
                      </li>
                    </ul>
                  ))}
                </>
              ) : (
                <>
                  <p className="no-course-found">No section is assigned</p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdvisedCourses;
