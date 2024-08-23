const Department = require("../models/Department");

const createDepartment = async (req, res) => {
  const { name, details, selectedCourses } = req.body;
  try {
    const departmentExist = await Department.findOne({ name });
    if (departmentExist) {
      return res
        .status(400)
        .json({ message: "This Department already Exists." });
    }
    const department = new Department({
      name,
      details,
      courses: selectedCourses,
    });
    await department.save();
    res.status(201).json({ message: "Department created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteDepartment = async (req, res) => {
  // const { id } = req.params;
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      res.status(404).json({ message: "This Department Do not Exist." });
    }
    await Department.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Department deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createDepartment, getDepartments, deleteDepartment };
