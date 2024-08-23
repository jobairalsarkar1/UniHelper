const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courseCode: { type: String, required: true },
  description: { type: String, required: true },
  credit: { type: Number, default: null },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    // required: true,
  },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", CourseSchema);
