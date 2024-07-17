const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ID: { type: String, default: null },
  status: {
    type: String,
    default: null,
    enum: ["student", "teacher", "admin"],
  },
});

module.exports = mongoose.model("User", UserSchema);
