const GradeSheet = require("../models/GradeSheet");
const Course = require("../models/Course");

const createGradeSheet = async (req, res) => {
  const { studentId } = req.params;
  // console.log(studentId);
  try {
    const existedGradeSheet = await GradeSheet.findOne({ student: studentId });
    if (existedGradeSheet) {
      return res
        .status(404)
        .json({ message: "This student alreay have a gradeSheet." });
    }

    const gradeSheet = new GradeSheet({
      student: studentId,
      semesters: [],
      totalCGPA: 0,
    });
    await gradeSheet.save();
    res
      .status(201)
      .json({ message: "GradeSheet created successfully.", gradeSheet });
  } catch (error) {
    res.status(500).json({ message: "Failed to create gradeSheet.", error });
  }
};

const addSemester = async (req, res) => {
  const { studentId } = req.params;
  const { semester } = req.body;
  try {
    const updatedGradeSheet = await GradeSheet.findOneAndUpdate(
      { student: studentId },
      { $push: { semesters: { semester, courses: [], semesterCGPA: 0 } } },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Semester added successfully.", updatedGradeSheet });
  } catch (error) {
    res.status(500).json({ message: "Failed to add semester", error });
  }
};

const addCourseGrade = async (req, res) => {
  const { studentId } = req.params;
  const { semester, courseId, grade, cgpa } = req.body;
  // console.log(studentId, semester, courseId, grade, cgpa);
  try {
    const gradeSheet = await GradeSheet.findOne({ student: studentId });
    // console.log(`Step 1:- ${gradeSheet}`);
    if (!gradeSheet) {
      return res.status(404).json({ message: "GradeSheet not found." });
    }

    const courseSpecific = await Course.findById(courseId);
    if (!courseSpecific) {
      return res.status(404).json({ message: "Course not found." });
    }

    const semesterData = gradeSheet.semesters.find(
      (sem) => sem.semester === semester
    );
    // console.log(`Step 2:- ${semesterData}`);
    if (!semesterData) {
      return res.status(404).json({ message: "Semester not found" });
    }
    const existingCourse = semesterData.courses.findIndex(
      (course) => course.course.toString() === courseId
    );
    if (existingCourse >= 0) {
      semesterData.courses[existingCourse].grade = grade;
      semesterData.courses[existingCourse].cgpa = cgpa;
    } else {
      semesterData.courses.push({ course: courseId, grade, cgpa });
      gradeSheet.creditCompleted += courseSpecific.credit;
    }
    const totalSemesterCGPA = semesterData.courses.reduce(
      (sum, course) => sum + course.cgpa,
      0
    );
    semesterData.semesterCGPA = (
      totalSemesterCGPA / semesterData.courses.length
    ).toFixed(2);

    let totalCGPASum = 0;
    let totalCourseCount = 0;
    gradeSheet.semesters.forEach((sem) => {
      if (sem.courses.length > 0) {
        const semesterCGPA = parseFloat(sem.semesterCGPA);
        const courseCount = sem.courses.length;

        totalCGPASum += semesterCGPA * courseCount;
        totalCourseCount += courseCount;
      }
    });

    gradeSheet.totalCGPA = (totalCGPASum / totalCourseCount).toFixed(2);
    await gradeSheet.save();
    res.status(200).json({ message: "Course grade updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to update course grade." });
  }
};

const getGradeSheet = async (req, res) => {
  const { studentId } = req.params;
  try {
    const gradeSheet = await GradeSheet.findOne({
      student: studentId,
    })
      .populate({
        path: "student",
        select: "name email ID departmentId",
        populate: { path: "departmentId", select: "name details" },
      })
      .populate({
        path: "semesters.courses.course",
        model: "Course",
        select: "name courseCode credit department",
      });
    if (!gradeSheet) {
      return res
        .status(404)
        .json({ message: "This student don't have a gradesheet." });
    }
    res.status(200).json(gradeSheet);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  createGradeSheet,
  addSemester,
  addCourseGrade,
  getGradeSheet,
};
