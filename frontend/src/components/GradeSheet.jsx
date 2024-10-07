import { useContext, useEffect, useState } from "react";
import { AllStudents, SearchThings } from "../components";
import { AuthContext } from "../contexts/AuthContext";
import { generatePdf } from "../utils";
import axios from "axios";
import "../styles/External.css";

const GradeSheet = () => {
  const { userOne } = useContext(AuthContext);
  const [students, setStudents] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [gradeSheet, setGradeSheet] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://unihelper.onrender.com/api/users/all-users", {
          headers: { "x-auth-token": token },
        });
        setStudents(response.data.filter((user) => user.status === "student"));
      } catch (error) {
        console.error(`Something went wrong ${error.message}`);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchGradeSheet = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://unihelper.onrender.com/api/grade-sheets/get-gradesheet/${userOne._id}`,
          { headers: { "x-auth-token": token } }
        );
        if (response.status === 200) {
          setGradeSheet(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchGradeSheet();
  }, [userOne._id]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchedResults = students.filter(
          (student) =>
            student.name.toLowerCase().includes(searchText.toLowerCase()) ||
            student.email.toLowerCase().includes(searchText.toLowerCase()) ||
            student.ID.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchedResults);
      }, 500)
    );
  };

  const handlePrint = () => {
    generatePdf(".gradeSheetIndividual-gradeSheet-container", userOne.ID);
  };

  return (
    <div className="gradeSheet-container">
      <div className="gradeSheet-inner-container">
        {userOne.status === "admin" && (
          <>
            <SearchThings
              searchText={searchText}
              handleSearchChange={handleSearchChange}
            />
            {searchText ? (
              <>
                <AllStudents
                  students={searchedResults}
                  redirectTo="/gradesheet/admin"
                />
              </>
            ) : (
              <>
                <AllStudents
                  students={students}
                  redirectTo="/gradesheet/admin"
                />
              </>
            )}
          </>
        )}
        {userOne.status === "student" && (
          <>
            <div className="gradeSheetIndividual-gradeSheet-container">
              <div className="gradeSheetIndividual-gradeSheet-basic-info">
                <span>
                  Name: <strong>{gradeSheet?.student.name}</strong>
                </span>
                <span>
                  ID: <strong>{gradeSheet?.student.ID}</strong>
                </span>
              </div>
              <div className="gradeSheetIndividual-actual-gradeSheet">
                <ul className="gradeSheet-info-list">
                  <li className="gradeSheet-list-header gradeSheet-info-items gradeSheet-info-item-id">
                    Code
                  </li>
                  <li className="gradeSheet-list-header gradeSheet-info-items gradeSheet-info-item-id">
                    Course Title
                  </li>
                  <li className="gradeSheet-list-header gradeSheet-info-items">
                    Credit
                  </li>
                  <li className="gradeSheet-list-header gradeSheet-info-items">
                    Grade
                  </li>
                  <li className="gradeSheet-list-header gradeSheet-info-items">
                    CGPA
                  </li>
                </ul>
                {gradeSheet?.semesters?.map((semester) => (
                  <>
                    <div key={semester._id}>
                      <li className="gradeSheet-info-items-inner semester-name-holder">
                        Semester: <strong>{semester.semester}</strong>
                      </li>
                      {semester.courses?.map((course) => (
                        <>
                          <ul
                            key={course._id}
                            className="gradeSheet-info-list-inner"
                          >
                            <li className="gradeSheet-info-items-inner gradeSheet-info-items gradeSheet-info-item-id-inner">
                              {course.course.courseCode}
                            </li>
                            <li className="gradeSheet-info-items-inner gradeSheet-info-items">
                              {course.course.name}
                            </li>
                            <li className="gradeSheet-info-items-inner gradeSheet-info-items">
                              {course.course.credit}
                            </li>
                            <li className="gradeSheet-info-items-inner gradeSheet-info-items">
                              {course.grade}
                            </li>
                            <li className="gradeSheet-info-items-inner gradeSheet-info-items">
                              {course.cgpa}
                            </li>
                          </ul>
                        </>
                      ))}
                      <ul className="gradeSheet-info-list-inner-total">
                        <li className="gradeSheet-info-items gradeSheet-info-item-id">
                          Semester Total
                        </li>
                        {/* <li className="gradeSheet-info-items">Grade</li> */}
                        <li className="gradeSheet-info-items">
                          {semester.courses.length * 3}
                        </li>
                        <li className="gradeSheet-info-items">
                          {semester.courses.length * 3}
                        </li>
                        <li className="gradeSheet-info-items">
                          {semester.semesterCGPA}
                        </li>
                      </ul>
                    </div>
                  </>
                ))}
                <ul className="gradeSheet-info-list-inner-total final-result">
                  <li className="gradeSheet-info-items gradeSheet-info-item-id">
                    Cumulative
                  </li>
                  <li className="gradeSheet-info-items">Grade</li>
                  {/* <li className="gradeSheet-info-items">Grade</li> */}
                  <li className="gradeSheet-info-items">
                    {gradeSheet?.creditCompleted}
                  </li>
                  <li className="gradeSheet-info-items">
                    {gradeSheet?.totalCGPA}
                  </li>
                </ul>
              </div>
            </div>
            <div className="print-gradeSheet-btn-container">
              <button
                type="button"
                className="print-gradeSheet-btn"
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GradeSheet;
