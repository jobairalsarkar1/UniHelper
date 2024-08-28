const Course = require("../models/Course");
const Section = require("../models/Section");

const createCourse = async (req, res) => {
  const { name, courseCode, credit, description } = req.body;
  try {
    const courseExists = await Course.findOne({ courseCode });
    if (courseExists) {
      return res.status(400).json({ message: "Course already Exists." });
    }

    const course = new Course({
      name,
      courseCode,
      credit,
      description,
    });
    await course.save();
    res.status(201).json({ message: "Course Created Successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error." });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSection = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { sectionNumber, schedule, classRoom } = req.body;
    const newSection = await Section({
      course: courseId,
      sectionNumber,
      schedule,
      classRoom,
    });
    await newSection.save();
    await Course.findByIdAndUpdate(courseId, {
      $push: { sections: newSection._id },
    });
    res.status(201).json(newSection);
  } catch (error) {
    res.status(500).json({ message: "Faild to Create Section.", error });
  }
};

const getCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("sections");
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server Error." });
  }
};

const getAllSection = async (req, res) => {
  try {
    const sections = await Section.find().populate("course");
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: "Server Error." });
  }
};

const getSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const section = await Section.findById(sectionId).populate("course");
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: "Server Eroor." });
  }
};

const deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ message: "Course do not exists." });
    }

    await Section.findByIdAndDelete(sectionId);
    res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  deleteCourse,
  createSection,
  getCourse,
  getAllSection,
  getSection,
  deleteSection,
};
