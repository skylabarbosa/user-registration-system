const express = require("express");
const {
  register,
  getRegistration,
} = require("../controllers/registrationController");

const router = express.Router();

// Handles new user registration
router.post("/register", register);

// Loads saved registration details for the confirmation page
router.get("/register/:userId", getRegistration);

module.exports = router;
