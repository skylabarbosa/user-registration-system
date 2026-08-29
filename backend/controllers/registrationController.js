const {
  registerUser,
  getRegisteredUser,
} = require("../services/registrationService");

async function register(req, res) {
  try {
    // Call the registration service
    const result = await registerUser(req.body);

    // Registration successful
    res.status(201).json({
      message: "Registration successful",
      userId: result.insertId,
    });

  } catch (error) {
    console.error("Registration error:", error.message);

    if (error.statusCode === 400) {
      return res.status(400).json({
        message: error.message,
        errors: error.details,
      });
    }

    // Handle known validation errors
    if (
      error.message === "Email is already registered" ||
      error.message === "Invalid pincode"
    ) {
      return res.status(400).json({
        message: error.message,
      });
    }

    // Handle unexpected errors
    res.status(500).json({
      message: "Registration failed",
    });
  }
}

async function getRegistration(req, res) {
  try {
    const user = await getRegisteredUser(req.params.userId);

    res.json({
      user,
    });
  } catch (error) {
    console.error("Get registration error:", error.message);

    res.status(error.statusCode || 500).json({
      message: error.message || "Unable to load registration details",
    });
  }
}

module.exports = {
  register,
  getRegistration,
};
