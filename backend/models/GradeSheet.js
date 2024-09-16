const mongoose = require("mongoose");

const CourseGradeSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  grade: { type: String, required: true },
  cgpa: { type: Number, required: true },
});

const SemesterSchema = new mongoose.Schema({
  semester: { type: String, required: true },
  courses: [CourseGradeSchema],
  semesterCGPA: { type: Number, default: 0 },
});

const GradeSheetSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    semesters: [SemesterSchema],
    totalCGPA: { type: Number, default: 0 },
    creditCompleted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GradeSheet", GradeSheetSchema);
