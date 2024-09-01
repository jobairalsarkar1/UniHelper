const express = require("express");
const router = express.Router();
const ClassroomController = require("../controllers/classroomController");
const auth = require("../middleware/authenticate");

router.post("/create-classroom", ClassroomController.createClassroom);
router.get("/get-classrooms", ClassroomController.getClassrooms);
router.delete(
  "/delete-classroom/:classroomId",
  ClassroomController.deleteClassroom
);

module.exports = router;
