const express = require("express");
const router = express.Router();
const AdvisingPanelController = require("../controllers/advisingPanelController");
const auth = require("../middleware/authenticate");

router.post(
  "/create-advising-slot",
  AdvisingPanelController.createAdvisingSlot
);
router.get(
  "/get-pending-advising-panels",
  auth,
  AdvisingPanelController.getPendingAdvisingPanels
);

router.put(
  "/approve-advising/:panelId",
  auth,
  AdvisingPanelController.approveAdvising
);
router.get(
  "/get-my-advisingpanel/:studentId",
  auth,
  AdvisingPanelController.getMyAdvisingPanel
);

router.post(
  "/add-course-section",
  auth,
  AdvisingPanelController.addCourseSection
);
router.post(
  "/drop-course-section",
  auth,
  AdvisingPanelController.dropCourseSection
);

module.exports = router;
