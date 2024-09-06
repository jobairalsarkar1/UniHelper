const express = require("express");
const router = express.Router();
const ConsultationController = require("../controllers/consultationController");
const auth = require("../middleware/authenticate");

router.post("/make-request", auth, ConsultationController.requestConsultation);
router.get("/get-consultations", auth, ConsultationController.getConsultations);
router.put("/approve-conulstation", ConsultationController.approveConsultation);
router.put(
  "/reject-consultation",
  auth,
  ConsultationController.rejectConsultation
);

module.exports = router;
