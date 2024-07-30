const mongoose = require("mongoose");

const AdvisingPanelSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedCredits: { type: Number, required: true },
  availableCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  selectedSections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  advisingSlot: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdvisingPanel", AdvisingPanelSchema);
