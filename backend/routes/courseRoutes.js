const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticate");
const CourseController = require("../controllers/courseController");

// Define routes
router.post("/create-course", auth, CourseController.createCourse);
router.get("/get-courses", auth, CourseController.getCourses);
router.delete("/delete-course/:id", auth, CourseController.deleteCourse);
router.post("/create-section/:courseId", auth, CourseController.createSection);
router.get("/get-sections", auth, CourseController.getAllSection);
router.get("/get-section/:sectionId", auth, CourseController.getSection);
router.get("/get-course/:courseId", auth, CourseController.getCourse);
router.delete(
  "/delete-section/:sectionId",
  auth,
  CourseController.deleteSection
);
// router.get('/:id', CourseController.getCourseById);
// router.put('/:id', CourseController.updateCourse);

module.exports = router;
