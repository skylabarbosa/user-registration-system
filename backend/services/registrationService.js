const bcrypt = require("bcrypt");

const {
  createUser,
  findUserByEmail,
  findUserById,
} = require("../repositories/userRepository");

const {
  checkPincode,
} = require("./pincodeService");

function validateRegistrationData(userData) {
  const errors = [];
  const {
    firstName = "",
    lastName = "",
    email = "",
    phone = "",
    password = "",
    pincode = "",
  } = userData;

  if (!/^[A-Za-z]+$/.test(firstName.trim())) {
    errors.push("First name should contain only alphabets");
  }

  if (!/^[A-Za-z]+$/.test(lastName.trim())) {
    errors.push("Last name should contain only alphabets");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push("Enter a valid email address");
  }

  if (phone.trim().startsWith("+")) {
    if (!/^\+[1-9]\d{12}$/.test(phone.trim())) {
      errors.push("Phone number must contain + followed by 13 digits and cannot start with 0");
    }
  } else if (!/^[1-9]\d{9}$/.test(phone.trim())) {
    errors.push("Phone number must contain exactly 10 digits and cannot start with 0");
  }

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  } else if (!/[A-Za-z]/.test(password)) {
    errors.push("Password must contain at least one alphabet");
  } else if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  } else if (!/[@#$&!]/.test(password)) {
    errors.push("Password must contain at least one special character (@, #, $, &, !)");
  }

  if (!/^\d{6}$/.test(pincode.trim())) {
    errors.push("Pincode must contain exactly 6 digits");
  }

  return errors;
}

async function registerUser(userData) {
  const validationErrors = validateRegistrationData(userData);

  if (validationErrors.length > 0) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = validationErrors;
    throw error;
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    pincode,
  } = userData;

  // 1. Check whether the email is already registered
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email is already registered");
  }

  // 2. Check whether the pincode actually exists
  const pincodeResult = await checkPincode(pincode);

  if (!pincodeResult.valid) {
    throw new Error("Invalid pincode");
  }

  // 3. Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Prepare the user data
  const userToSave = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    password: hashedPassword,
    pincode: pincode.trim(),
  };

  // 5. Save the user in MySQL
  const result = await createUser(userToSave);

  return result;
}

async function getRegisteredUser(userId) {
  if (!/^\d+$/.test(String(userId))) {
    const error = new Error("Invalid user id");
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserById(userId);

  if (!user) {
    const error = new Error("Registration details not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
}

module.exports = {
  registerUser,
  getRegisteredUser,
};
