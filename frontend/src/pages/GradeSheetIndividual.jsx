import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/External.css";

const GradeSheetIndividual = () => {
  const { studentId } = useParams();
  const [formData, setFormData] = useState({
    course: "",
    grade: "",
    cgpa: null,
  });
  const [semester, setSemester] = useState("");
  const [gradeSheet, setGradeSheet] = useState(null);
  const [courses, setCourses] = useState(null);
  const [created, setCreated] = useState(false);
  const [visibleSemesterId, setVisibleSemesterId] = useState(null);

  const { course, grade, cgpa } = formData;

  useEffect(() => {
    const fetchGradeSheet = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/grade-sheets/get-gradesheet/${studentId}`,
          { headers: { "x-auth-token": token } }
        );
        if (response.status === 200) {
          setGradeSheet(response.data);
        }
      } catch (error) {
        console.error(error.response?.data?.message);
        // alert(error.message);
      }
    };

    fetchGradeSheet();
  }, [studentId, created]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/courses/get-courses", {
          headers: { "x-auth-token": token },
        });
        if (response.status === 200) {
          setCourses(response.data);
        }
      } catch (error) {
        console.error(`Failed to fetch courses, ${error.message}`);
      }
    };
    fetchCourses();
  }, []);

  const createGradeSheet = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/grade-sheets/create-gradesheet/${studentId}`,
        {},
        { headers: { "x-auth-token": token } }
      );
      if (response.status === 201) {
        setGradeSheet(response.data.gradeSheet);
      }
    } catch (error) {
      console.error(`Failed to Create gradeSheet: ${error.message}`);
    }
  };

  const handleCreateSemester = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/grade-sheets/add-semester/${studentId}`,
        {
          semester,
        },
        { headers: { "x-auth-token": token } }
      );
      if (response.status === 200) {
        // setGradeSheet((prev) => ({
        //   ...prev,
        //   semesters: [...prev.semesters, response.data.semester],
        // }));
        setCreated(!created);
        setSemester("");
      }
    } catch (error) {
      console.log(`Failed to create semester: ${error.message}`);
    }
  };

  const handleSemesterClick = (semesterId) => {
    setVisibleSemesterId((prevId) =>
      prevId === semesterId ? null : semesterId
    );
  };

  const handleCourseGradeSubmit = async (semester) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/grade-sheets/add-courseGrade/${studentId}`,
        { semester, courseId: course, grade, cgpa },
        { headers: { "x-auth-token": token } }
      );
      if (response.status === 200) {
        setCreated(!created);
        setFormData({ course: "", grade: "", cgpa: "" });
      }
    } catch (error) {
      alert("failed to add grade");
      console.error(`Failed to add course grade: ${error.message}`);
    }
  };

  console.log(gradeSheet);

  return (
    <div className="gradeSheetIndividual-container">
      <div className="gradeSheetIndividual-inner-container">
        {!gradeSheet && (
          <>
            <div className="make-gradesheet-button-container">
              <button
                type="button"
                className="gradeSheetIndividual-create-gradesheet-btn"
                onClick={createGradeSheet}
              >
                Create GradeSheet
              </button>
            </div>
          </>
        )}

        {gradeSheet && (
          <>
            <div className="gradeSheetIndividual-create-semester-form">
              <input
                type="text"
                name="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="Semester.."
                className="gradeSheetIndividual-semester-input"
                required
              />
              <button
                type="button"
                className="gradeSheetIndividual-create-gradesheet-btn"
                onClick={handleCreateSemester}
              >
                Create
              </button>
            </div>

            <div className="gradeSheetIndividual-semester-course-container">
              <span className="semesters-container-title">Semesters:</span>
              {gradeSheet?.semesters.map((semester) => (
                <div
                  className="gradeSheetIndividual-semesters-container"
                  key={semester._id}
                >
                  <button
                    className="gradeSheetIndividual-semester-name"
                    onClick={() => handleSemesterClick(semester._id)}
                  >
                    {semester.semester}
                  </button>
                  <div
                    className={`gradeSheetIndividual-semester-course-grade-update-from ${
                      visibleSemesterId === semester._id ? "visible" : "hidden"
                    }`}
                  >
                    <select
                      name="select-course"
                      id="select-course"
                      value={course}
                      onChange={(e) =>
                        setFormData({ ...formData, course: e.target.value })
                      }
                      className="course-grade-options"
                      required
                    >
                      <option value="">Select Course</option>
                      {courses?.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.courseCode}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="grade"
                      value={grade}
                      onChange={(e) =>
                        setFormData({ ...formData, grade: e.target.value })
                      }
                      placeholder="Grade"
                      className="course-grade-options"
                      required
                    />
                    <input
                      type="number"
                      name="cgpa"
                      value={cgpa}
                      onChange={(e) =>
                        setFormData({ ...formData, cgpa: e.target.value })
                      }
                      placeholder="CGPA"
                      className="course-grade-options"
                      required
                    />
                    <button
                      type="button"
                      className="gradeSheetIndividual-course-grade-btn"
                      onClick={() => handleCourseGradeSubmit(semester.semester)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
              {/* <div className="gradeSheetIndividual-semesters-container">
                <button
                  className="gradeSheetIndividual-semester-name"
                  onClick={handleSemesterClick}
                >
                  Spring2024
                </button>
                <div
                  className={`gradeSheetIndividual-semester-course-grade-update-from ${
                    isVisible ? "visible" : "hidden"
                  }`}
                >
                  <select
                    name="select-course"
                    id="select-course"
                    value={course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    className="course-grade-options"
                  >
                    <option value="">Select Course</option>
                    {courses?.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.courseCode}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="grade"
                    value={grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                    placeholder="Grade"
                    className="course-grade-options"
                  />
                  <input
                    type="number"
                    name="cgpa"
                    value={cgpa}
                    onChange={(e) =>
                      setFormData({ ...formData, cgpa: e.target.value })
                    }
                    placeholder="CGPA"
                    className="course-grade-options"
                  />
                  <button
                    type="button"
                    className="gradeSheetIndividual-course-grade-btn"
                    onClick={handleCourseGradeSubmit}
                  >
                    Add
                  </button>
                </div>
              </div> */}
              {/* <div className="gradeSheetIndividual-semesters-container">
                <button className="gradeSheetIndividual-semester-name">
                  Fall2024
                </button>
              </div> */}
            </div>
          </>
        )}
        {gradeSheet && (
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
          </>
        )}
      </div>
    </div>
  );
};

export default GradeSheetIndividual;
