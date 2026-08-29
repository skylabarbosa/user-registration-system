export function validatePincode(pincode) {
  // Pincode cannot be empty
  if (pincode.trim() === "") {
    return "Pincode is required";
  }

  // Indian pincodes must contain exactly 6 digits
  if (!/^\d{6}$/.test(pincode.trim())) {
    return "Pincode must contain exactly 6 digits";
  }

  // Format is correct. The actual pincode will be checked by the backend.
  return "";
}