const Course = require("../models/Course");

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

module.exports = { createCourse, getCourses, deleteCourse };
