const express = require("express");
const router = express.Router();
const ClassroomController = require("../controllers/classroomController");
const uploadClassroomFiles = require("../middleware/classroomFileUpload");
const auth = require("../middleware/authenticate");

router.post("/create-classroom", auth, ClassroomController.createClassroom);
router.get("/get-classrooms", auth, ClassroomController.getClassrooms);
router.delete(
  "/delete-classroom/:classroomId",
  ClassroomController.deleteClassroom
);
router.post(
  "/create-post",
  uploadClassroomFiles.array("files"),
  auth,
  ClassroomController.createPost
);

router.get("/posts/:classroomId", auth, ClassroomController.getClassroomPosts);
router.post("/posts/make-comment", auth, ClassroomController.makeComment);

module.exports = router;
