// const express = require("express");
// const router = express.Router();
// const {
//   registerUser,
//   loginUser,
//   getProfile,
// } = require("../controllers/userControllers");
// const auth = require("../middleware/authenticate");

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", auth, getProfile);

// module.exports = router;

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userControllers");
const auth = require("../middleware/authenticate");

// Define routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/profile", auth, UserController.getProfile);
// router.get("/:id", UserController.getUser);
// router.put("/:id", UserController.updateUser);

module.exports = router;
