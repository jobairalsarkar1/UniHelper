const express = require("express");
const router = express.Router();
const ClassroomController = require("../controllers/classroomController");
const uploadClassroomFiles = require("../middleware/classroomFileUpload");
const auth = require("../middleware/authenticate");

router.post("/create-classroom", auth, ClassroomController.createClassroom);
router.get("/get-classrooms", auth, ClassroomController.getClassrooms);
router.get(
  "/get-classroomInfo/:classroomId",
  auth,
  ClassroomController.getClassroomInfo
);
router.delete(
  "/delete-classroom/:classroomId",
  auth,
  ClassroomController.deleteClassroom
);
router.post(
  "/create-post",
  uploadClassroomFiles.array("files"),
  auth,
  ClassroomController.createPost
);
router.delete(
  "/posts/delete-post/:postId",
  auth,
  ClassroomController.deletePost
);
router.get("/posts/:classroomId", auth, ClassroomController.getClassroomPosts);
router.post("/posts/make-comment", auth, ClassroomController.makeComment);
router.put(
  "/add-members/:classroomId",
  auth,
  ClassroomController.addClassroomMembers
);

module.exports = router;
