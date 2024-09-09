const express = require("express");
const router = express.Router();
const GradeSheetController = require("../controllers/gradeSheetController");
const auth = require("../middleware/authenticate");

router.post(
  "/create-gradesheet/:studentId",
  auth,
  GradeSheetController.createGradeSheet
);
router.get(
  "/get-gradesheet/:studentId",
  auth,
  GradeSheetController.getGradeSheet
);

router.put("/add-semester/:studentId", auth, GradeSheetController.addSemester);
router.put(
  "/add-courseGrade/:studentId",
  auth,
  GradeSheetController.addCourseGrade
);

module.exports = router;
