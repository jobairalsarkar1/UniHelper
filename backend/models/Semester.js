const mongoose = require("mongoose");
const SemesterSchema = new mongoose.Schema(
  {
    semesterName: { type: String, required: true },
    teacherSections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
    SemesterAdvisingSlots: [
      { type: mongoose.Schema.Types.ObjectId, ref: "AdvisingPanel" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Semester", SemesterSchema);
