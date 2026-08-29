const { checkPincode } = require("../services/pincodeService");

async function validatePincode(req, res) {
  try {
    const { pincode } = req.params;

    // Ask the service to check the pincode
    const result = await checkPincode(pincode);

    // Send the API result back to the frontend
    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to validate pincode",
    });
  }
}

module.exports = {
  validatePincode,
};