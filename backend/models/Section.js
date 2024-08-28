const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  sectionNumber: { type: Number, required: true },
  schedule: {
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  classRoom: { type: String, required: true },
  seat: { type: Number, default: 35 },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Section", SectionSchema);
