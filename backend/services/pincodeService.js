async function checkPincode(pincode) {
  try {
    // Call the external pincode API
    const response = await fetch(
      `https://api.pincodeapi.in/api/v1/pincode/${pincode}`
    );

    // Convert the response into JavaScript data
    const data = await response.json();

    // API returns success: true when the pincode is found
    if (response.ok && data.success === true) {
      return {
        valid: true,
        message: "Valid pincode",
        data: data.data,
      };
    }

    // Pincode was not found
    return {
      valid: false,
      message: "Invalid pincode",
    };
  } catch (error) {
    console.error("Pincode API error:", error);

    // Something went wrong while contacting the API
    throw new Error("Unable to check pincode");
  }
}

module.exports = {
  checkPincode,
};