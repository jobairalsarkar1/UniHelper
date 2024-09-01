const Classroom = require("../models/Classroom");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const cloudinary = require("cloudinary").v2;

const createClassroom = async (req, res) => {
  //   console.log(req.body);
  try {
    const { title, name, semester, creator } = req.body;
    const newClassroom = new Classroom({
      title,
      name,
      semester,
      creator,
      users: [creator],
    });
    await newClassroom.save();
    res.status(201).json({
      message: "Classroom created successfully",
      classroom: newClassroom,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating classroom." });
  }
};

const getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate("users");
    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch classrooms." });
  }
};

const deleteClassroom = async (req, res) => {
  const { classroomId } = req.params;
  const userId = req.body.userId;
  //   console.log(classroomId);
  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom do not exists." });
    }

    if (classroom.creator.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this classroom. " });
    }

    await Classroom.findByIdAndDelete(classroomId);
    res.status(200).json({ message: "Classroom deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Classroom is not deleted. Please try again..." });
  }
};

module.exports = { createClassroom, getClassrooms, deleteClassroom };
