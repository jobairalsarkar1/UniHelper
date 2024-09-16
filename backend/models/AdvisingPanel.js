const mongoose = require("mongoose");

const AdvisingPanelSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedCredits: { type: Number, required: true },
  semester: { type: String, required: true },
  selectedSections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  advisingSlot: { type: Date, required: true },
  advisingStatus: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdvisingPanel", AdvisingPanelSchema);
