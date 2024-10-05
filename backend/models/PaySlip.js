const mongoose = require("mongoose");

const PaySlipSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    semester: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaySlip", PaySlipSchema);
