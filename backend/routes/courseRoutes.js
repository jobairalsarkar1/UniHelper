const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/courseController");

// Define routes
router.post("/create-course", CourseController.createCourse);
router.get("/get-courses", CourseController.getCourses);
router.delete("/delete-course/:id", CourseController.deleteCourse);
// router.get('/:id', CourseController.getCourseById);
// router.put('/:id', CourseController.updateCourse);

module.exports = router;
