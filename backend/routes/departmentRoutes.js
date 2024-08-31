const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticate");
const DepartmentController = require("../controllers/departmentController");

// Define routes
router.post("/create-department", auth, DepartmentController.createDepartment);
router.get("/get-departments", auth, DepartmentController.getDepartments);
router.delete("/:id", auth, DepartmentController.deleteDepartment);
// router.get("/", DepartmentController.getDepartments);
// router.get("/:id", DepartmentController.getDepartmentById);
// router.put("/:id", DepartmentController.updateDepartment);

module.exports = router;
