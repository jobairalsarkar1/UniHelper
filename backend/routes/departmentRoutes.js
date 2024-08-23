const express = require("express");
const router = express.Router();
const DepartmentController = require("../controllers/departmentController");

// Define routes
router.post("/create-department", DepartmentController.createDepartment);
router.get("/get-departments", DepartmentController.getDepartments);
router.delete("/:id", DepartmentController.deleteDepartment);
// router.get("/", DepartmentController.getDepartments);
// router.get("/:id", DepartmentController.getDepartmentById);
// router.put("/:id", DepartmentController.updateDepartment);

module.exports = router;
