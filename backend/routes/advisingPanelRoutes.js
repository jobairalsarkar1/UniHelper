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
// Define routes
// router.post('/', AdvisingPanelController.createAdvisingPanel);
// router.get('/', AdvisingPanelController.getAdvisingPanels);
// router.get('/:id', AdvisingPanelController.getAdvisingPanelById);
// router.put('/:id', AdvisingPanelController.updateAdvisingPanel);
// router.delete('/:id', AdvisingPanelController.deleteAdvisingPanel);

module.exports = router;
