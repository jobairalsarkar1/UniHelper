const express = require("express");
const router = express.Router();
const ClassroomController = require("../controllers/classroomController");
const auth = require("../middleware/authenticate");

// Define routes
// router.post("/", ClassroomController.createClassroom);
// router.get("/", ClassroomController.getClassrooms);
// router.get("/:id", ClassroomController.getClassroomById);
// router.put("/:id", ClassroomController.updateClassroom);
// router.delete("/:id", ClassroomController.deleteClassroom);

// Classroom routes
router.post("/classrooms", auth, ClassroomController.createClassroom);
router.put(
  "/classrooms/:classroomId/add-student",
  auth,
  ClassroomController.addStudent
);
router.put(
  "/classrooms/:classroomId/remove-student",
  auth,
  ClassroomController.removeStudent
);
router.post(
  "/classrooms/:classroomId/posts",
  auth,
  ClassroomController.createPost
);
router.post("/upload", auth, ClassroomController.uploadFile);
router.post("/posts/:postId/comments", auth, ClassroomController.createComment);
router.delete("/comments/:commentId", auth, ClassroomController.deleteComment);
router.delete(
  "/classrooms/:classroomId",
  auth,
  ClassroomController.deleteClassroom
);

module.exports = router;
