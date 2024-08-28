const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/courseController");

// Define routes
router.post("/create-course", CourseController.createCourse);
router.get("/get-courses", CourseController.getCourses);
router.delete("/delete-course/:id", CourseController.deleteCourse);
router.post("/create-section/:courseId", CourseController.createSection);
router.get("/get-sections", CourseController.getAllSection);
router.get("/get-section/:sectionId", CourseController.getSection);
router.get("/get-course/:courseId", CourseController.getCourse);
router.delete("/delete-section/:sectionId", CourseController.deleteSection);
// router.get('/:id', CourseController.getCourseById);
// router.put('/:id', CourseController.updateCourse);

module.exports = router;
