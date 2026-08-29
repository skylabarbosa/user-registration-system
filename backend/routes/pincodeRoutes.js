const express = require("express");
const { validatePincode } = require("../controllers/pincodeController");

const router = express.Router();

// Route used to check a pincode
router.get("/pincode/:pincode", validatePincode);

module.exports = router;