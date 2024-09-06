const Consultation = require("../models/Consultation");
const User = require("../models/User");
const { generateMeetLink } = require("../middleware/googleMeetUtils");

const requestConsultation = async (req, res) => {
  const { student, teacher, topic, consultationTime } = req.body;
  // console.log(student, teacher, topic, consultationTime);
  try {
    const startTime = new Date(consultationTime);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    const overlap = await Consultation.find({
      $or: [
        {
          student: student,
          consultationTime: { $gte: startTime, $lt: endTime },
        },
        {
          teacher: teacher,
          consultationTime: { $gte: startTime, $lt: endTime },
        },
      ],
    });
    if (overlap.length > 0) {
      return res.status(404).json({
        message: "Seems like one of you have Consultation this time.",
      });
    }
    const consultation = new Consultation({
      student,
      teacher,
      topic,
      consultationTime,
    });
    await consultation.save();
    res.status(201).json(consultation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find()
      .populate("teacher")
      .populate("student");
    res.status(200).json(consultations);
  } catch (error) {
    res.status(500).json({ message: "Faile to fetch consultations" });
  }
};

const approveConsultation = async (req, res) => {
  const { consultationId, status } = req.body;
  console.log(consultationId, status);
  try {
    const consultation = await Consultation.findById(consultationId)
      .populate("teacher")
      .populate("student");
    const meetLink = await generateMeetLink(
      consultation.teacher._id,
      consultation.consultationTime
    );

    if (!meetLink) {
      return res
        .status(500)
        .json({ message: "Failed to generate a Meeting Link" });
    }

    consultation.status = status;
    consultation.meetingLink = meetLink;
    await consultation.save();
    res.status(200).json({ message: "Consultation Approved", meetLink });
  } catch (error) {
    res.status(500).json({ message: "Failed to Approve request." });
  }
};

const rejectConsultation = async (req, res) => {
  const { consultationId, status, rejectionReason } = req.body;
  try {
    const consultation = await Consultation.findById(consultationId);
    if (!consultation) {
      return res.status(404).json({
        message: "Seems like there is a glitch, Consultation do not exists",
      });
    }
    const rejectedConsultation = await Consultation.findByIdAndUpdate(
      consultationId,
      { status, rejectionReason },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      message: "Consultation rejected successfully",
      consultation: rejectedConsultation,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to reject." });
  }
};

module.exports = {
  requestConsultation,
  getConsultations,
  approveConsultation,
  rejectConsultation,
};
