const GradeSheet = require("../models/GradeSheet");
const AdvisingPanel = require("../models/AdvisingPanel");

const createAdvisingSlot = async (req, res) => {
  const { advisingSlot, creditRangeStart, creditRangeEnd, semester } = req.body;
  console.log(req.body);
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

      if (existingPanel) {
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
  console.log(panelId);
  try {
    const panel = await AdvisingPanel.findById(panelId);
    if (panel) {
      panel.advisingStatus = "approved";
      await panel.save();
      res.status(200).json({ message: "Advising approved." });
    } else {
      res.status(404).json({ message: "Panel not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  createAdvisingSlot,
  getPendingAdvisingPanels,
  approveAdvising,
};
