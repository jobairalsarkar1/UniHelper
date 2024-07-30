const mongoose = require("mongoose");

const CourseSequenceSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  sequence: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CourseSequence", CourseSequenceSchema);
