const express = require("express");
const router = express.Router();
const multer = require("multer");
const UserController = require("../controllers/userControllers");
const auth = require("../middleware/authenticate");
const upload = require("../middleware/uploadMiddleware");

// Define routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/profile", auth, UserController.getProfile);
router.get("/all-users", UserController.getAllUsers);
router.get("/user/:id", UserController.getUser);
router.put(
  "/update/:userId",
  upload.single("profileImage"),
  UserController.updateUserInfo
);
router.delete("/delete-user/:id", UserController.deleteUser);
// router.get("/:id", UserController.getUser);
// router.put("/:id", UserController.updateUser);

module.exports = router;
