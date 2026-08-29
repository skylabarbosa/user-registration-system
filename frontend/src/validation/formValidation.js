export function validateForm(formData) {
  const errors = {};

  // First name validation
  if (formData.firstName.trim() === "") {
    errors.firstName = "First name is required";
  } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
    errors.firstName = "First name should contain only alphabets";
  }

  // Last name validation
  if (formData.lastName.trim() === "") {
    errors.lastName = "Last name is required";
  } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
    errors.lastName = "Last name should contain only alphabets";
  }

  // Email validation
  if (formData.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a valid email address";
  }

  // Phone number validation
  const phone = formData.phone.trim();

  if (phone === "") {
    errors.phone = "Phone number is required";
  } else if (phone.startsWith("+")) {
    // With +, exactly 13 digits should follow it and the first digit cannot be 0
    if (!/^\+[1-9]\d{12}$/.test(phone)) {
      errors.phone =
        "Phone number must contain + followed by 13 digits and cannot start with 0";
    }
  } else {
    // Without +, exactly 10 digits are allowed
    // The first digit cannot be 0
    if (!/^[1-9]\d{9}$/.test(phone)) {
      errors.phone =
        "Phone number must contain exactly 10 digits and cannot start with 0";
    }
  }

  // Password validation
  const password = formData.password;

  if (password === "") {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  } else if (!/[A-Za-z]/.test(password)) {
    errors.password = "Password must contain at least one alphabet";
  } else if (!/\d/.test(password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[@#$&!]/.test(password)) {
    errors.password =
      "Password must contain at least one special character (@, #, $, &, !)";
  }

  // Repeat password validation
  if (formData.repeatPassword === "") {
    errors.repeatPassword = "Please repeat your password";
  } else if (formData.repeatPassword !== formData.password) {
    errors.repeatPassword = "Passwords do not match";
  }

  // Pincode validation
  const pincode = formData.pincode.trim();

  if (pincode === "") {
    errors.pincode = "Pincode is required";
  } else if (!/^\d{6}$/.test(pincode)) {
    errors.pincode = "Pincode must contain exactly 6 digits";
  }

  return errors;
}
