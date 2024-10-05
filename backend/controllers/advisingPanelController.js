const GradeSheet = require("../models/GradeSheet");
const AdvisingPanel = require("../models/AdvisingPanel");
const Section = require("../models/Section");
const Semester = require("../models/Semester");
const User = require("../models/User");
const PaySlip = require("../models/PaySlip");
const { checkTimeClash } = require("../middleware/advisingHandler");

const createAdvisingSlot = async (req, res) => {
  const { advisingSlot, creditRangeStart, creditRangeEnd, semester } = req.body;
  // console.log(req.body);
  try {
    const gradeSheets = await GradeSheet.find({
      creditCompleted: { $gte: creditRangeStart, $lte: creditRangeEnd },
    }).populate("student");
    // console.log("gradeSheet pass");
    if (gradeSheets.length === 0) {
      return res
        .status(404)
        .json({ message: "No Students found within given credit range." });
    }

    for (const gradeSheet of gradeSheets) {
      const student = gradeSheet.student;

      const existingPanel = await AdvisingPanel.findOne({
        student: student._id,
        semester,
      });

      if (existingPanel && existingPanel.advisingStatus === "pending") {
        existingPanel.advisingSlot = advisingSlot;
        existingPanel.updatedAt = Date.now();
        await existingPanel.save();
        continue;
      }

      if (!existingPanel) {
        const newAdvisingPanel = new AdvisingPanel({
          student: student._id,
          completedCredits: gradeSheet.creditCompleted,
          semester,
          advisingSlot,
          advisingStatus: "pending",
          departmentId: student.departmentId,
        });
        await newAdvisingPanel.save();
      }
    }
    // console.log("Ok1");
    // console.log(advisingSlot);
    // await Semester.findOneAndUpdate(
    //   { semesterName: semester },
    //   {
    //     $addToSet: { SemesterAdvisingSlots: advisingSlot },
    //   },
    //   { new: true }
    // );
    // console.log("Ok2");
    // console.log("loop pass");
    res.status(201).json({ message: "Advising pannels created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getPendingAdvisingPanels = async (req, res) => {
  try {
    const advisingPanels = await AdvisingPanel.find({
      advisingStatus: "pending",
    })
      .populate("student")
      .populate("departmentId");
    res.status(200).json(advisingPanels);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const approveAdvising = async (req, res) => {
  const { panelId } = req.params;
  // console.log(panelId);
  try {
    const panel = await AdvisingPanel.findById(panelId);
    if (panel) {
      const paySlip = await PaySlip.findOne({
        student: panel.student,
        semester: panel.semester,
      });
      if (!paySlip) {
        const newPaySlip = new PaySlip({
          student: panel.student,
          semester: panel.semester,
        });
        await newPaySlip.save();
      }
      panel.advisingStatus = "approved";
      await panel.save();
      res.status(200).json({ message: "Advising approved & PaySlip created." });
    } else {
      res.status(404).json({ message: "Panel not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getMyAdvisingPanel = async (req, res) => {
  const { studentId } = req.params;
  try {
    const myAdvisingPanel = await AdvisingPanel.findOne({ student: studentId })
      .populate({ path: "student", model: "User", select: "name ID" })
      .populate({
        path: "departmentId",
        model: "Department",
        select: "name details",
      })
      .populate({
        path: "selectedSections",
        populate: [
          {
            path: "course",
            model: "Course",
            select: "name courseCode",
          },
          { path: "faculty", model: "User", select: "name" },
        ],
      });
    if (!myAdvisingPanel) {
      return res
        .status(404)
        .json({ message: "No advising panel scheduled for you." });
    }
    res.status(200).json(myAdvisingPanel);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const addCourseSection = async (req, res) => {
  const { advisingPanelId, sectionId } = req.body;
  // console.log(req.body);
  try {
    const advisingPanelToAdd = await AdvisingPanel.findById(
      advisingPanelId
    ).populate("selectedSections");
    // console.log("1st setp");
    if (!advisingPanelToAdd)
      return res.status(404).json({ message: "Advising panel not found." });

    // console.log("2st setp", advisingPanelToAdd.selectedSections.length);
    const newSection = await Section.findById(sectionId).populate("course");
    if (!newSection)
      return res.status(404).json({ message: "Section not found." });
    // console.log(newSection);

    const courseAlreadyAdded = advisingPanelToAdd.selectedSections.some(
      (section) => String(section.course) === String(newSection.course._id)
    );

    if (courseAlreadyAdded) {
      return res
        .status(400)
        .json({ message: `${newSection.course.courseCode} is already added.` });
    }

    const selectedSections = await Section.find({
      _id: { $in: advisingPanelToAdd.selectedSections },
    }).populate({
      path: "course",
      model: "Course",
      select: "courseCode schedule lab",
    });

    const clashingSections = checkTimeClash(selectedSections, newSection);
    // console.log("3st setp", clashingSections.toString());
    if (clashingSections.length > 0) {
      return res.status(400).json({
        message: "Ops!! This one have clash with: ",
        clashingSections: clashingSections,
      });
    }
    advisingPanelToAdd.selectedSections.push(newSection._id);
    await advisingPanelToAdd.save();
    res.status(200).json({ message: "Course added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const dropCourseSection = async (req, res) => {
  const { advisingPanelId, sectionId } = req.body;
  try {
    const advisingPanel = await AdvisingPanel.findById(advisingPanelId);
    advisingPanel.selectedSections = advisingPanel.selectedSections.filter(
      (section) => section.toString() !== sectionId
    );
    await advisingPanel.save();
    res.status(200).json({ message: "Course section dropped." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const createSemester = async (req, res) => {
  const { semesterName } = req.body;
  try {
    const semester = await Semester.findOne({ semesterName });
    if (semester) {
      return res.status(404).json({ message: "Semester already exists." });
    }
    const newSemester = new Semester({ semesterName });
    await newSemester.save();
    res.status(201).json({ message: "Semester created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to create semester." });
  }
};

const teacherSections = async (req, res) => {
  const { userId } = req.params;
  try {
    const teacher = await User.findById(userId);
    if (!teacher || teacher.status !== "teacher") {
      return res
        .status(403)
        .json({ message: "Access denied. you are not a teacher" });
    }
    const sections = await Section.find({ faculty: userId })
      .populate({
        path: "course",
        select: "name courseCode",
      })
      .populate({
        path: "students",
        select: "name email ID status profileImage",
      })
      .populate({ path: "faculty", select: "name" });

    // const formattedSections = sections.map((section) => ({
    //   schedule: section.schedule,
    //   lab: section.lab,
    //   _id: section._id,
    //   course: {
    //     _id: section.course._id,
    //     courseCode: section.course.courseCode,
    //   },
    //   sectionNumber: section.sectionNumber,
    //   classRoom: section.classRoom,
    //   seat: section.seat,
    //   faculty: section.faculty ? section.faculty._id : null,
    //   students: section.students.map((student) => ({
    //     _id: student._id,
    //     name: student.name,
    //     email: student.email,
    //     ID: student.ID,
    //   })),
    //   createdAt: section.createdAt,
    //   updatedAt: section.updatedAt,
    // }));
    return res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const paymentCheck = async (req, res) => {
  const { student, semester } = req.query;
  // console.log(req.query);
  try {
    const paymentStatus = await PaySlip.findOne({
      student: student,
      semester,
    });
    // console.log(paymentStatus);
    res.status(200).json(paymentStatus);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  createAdvisingSlot,
  getPendingAdvisingPanels,
  approveAdvising,
  getMyAdvisingPanel,
  addCourseSection,
  dropCourseSection,
  createSemester,
  teacherSections,
  paymentCheck,
};
