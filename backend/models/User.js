const mongoose = require("mongoose");

// const RoutineSchema = new mongoose.Schema({
//   section: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
//   course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
//   day: { type: String },
//   startTime: { type: String },
//   endTime: { type: String },
// });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ID: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: null,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    default: null,
  },
  // routine: [RoutineSchema],
  profileImage: { type: String, default: null },
  resetPasswordToken: { type: String, default: null },
  resetPasswordTokenExpires: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
