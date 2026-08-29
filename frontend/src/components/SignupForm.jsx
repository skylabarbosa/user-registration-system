import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../validation/formValidation";
import "./SignupForm.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function SignupForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (name === "pincode") {
      if (value.length === 6 && /^\d{6}$/.test(value)) {
        setPincodeStatus("Checking pincode...");

        try {
          const response = await fetch(
            `${API_URL}/api/pincode/${value}`
          );

          const data = await response.json();

          if (response.ok && data.valid) {
            setPincodeStatus("✓ Valid pincode");
          } else {
            setPincodeStatus("✕ Invalid pincode");
          }
        } catch (error) {
          console.error("Pincode check failed:", error);
          setPincodeStatus("Unable to check pincode");
        }
      } else {
        setPincodeStatus("");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);

    setErrors(validationErrors);
    setMessage("");

    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            pincode: formData.pincode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      // Registration was successful.
      // Send the entered details to the confirmation page.
      navigate(`/confirmation?userId=${data.userId}`, {
        state: {
          userId: data.userId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          pincode: formData.pincode,
        },
      });
    } catch (error) {
      console.error("Could not connect to backend:", error);
      setMessage("Could not connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">

      {/* LEFT IMAGE PANEL */}
      <section className="signup-image">

        <div className="image-overlay">
          <div className="image-content">
            <p className="image-small-text">WELCOME</p>

            <h2>
              Create your
              <br />
              Free Account
            </h2>

            <p className="image-description">
              Join us today and create
              <br />
              your account.
            </p>
          </div>
        </div>

      </section>


      {/* RIGHT FORM PANEL */}
      <section className="signup-form-section">

        <div className="signup-form-card">

          <div className="signup-header">
            <p className="form-small-heading">
              GET STARTED
            </p>

            <h1>Create Account</h1>

            <p className="form-subtitle">
              Enter your details to create your account
            </p>
          </div>


          <form onSubmit={handleSubmit}>

            {/* FIRST NAME */}
            <div className="form-group">
              <label htmlFor="firstName">
                First Name
              </label>

              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />

              {errors.firstName && (
                <p className="error">
                  {errors.firstName}
                </p>
              )}
            </div>


            {/* LAST NAME */}
            <div className="form-group">
              <label htmlFor="lastName">
                Last Name
              </label>

              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />

              {errors.lastName && (
                <p className="error">
                  {errors.lastName}
                </p>
              )}
            </div>


            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              {errors.email && (
                <p className="error">
                  {errors.email}
                </p>
              )}
            </div>


            {/* PHONE */}
            <div className="form-group">
              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />

              {errors.phone && (
                <p className="error">
                  {errors.phone}
                </p>
              )}
            </div>


            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />

              {errors.password && (
                <p className="error">
                  {errors.password}
                </p>
              )}
            </div>


            {/* REPEAT PASSWORD */}
            <div className="form-group">
              <label htmlFor="repeatPassword">
                Repeat Password
              </label>

              <input
                id="repeatPassword"
                type="password"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
              />

              {errors.repeatPassword && (
                <p className="error">
                  {errors.repeatPassword}
                </p>
              )}
            </div>


            {/* PINCODE */}
            <div className="form-group">
              <label htmlFor="pincode">
                Pincode
              </label>

              <input
                id="pincode"
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter your pincode"
                maxLength="6"
              />

              {errors.pincode && (
                <p className="error">
                  {errors.pincode}
                </p>
              )}

              {pincodeStatus && (
                <p
                  className={
                    pincodeStatus.includes("Valid")
                      ? "pincode-valid"
                      : "pincode-status"
                  }
                >
                  {pincodeStatus}
                </p>
              )}
            </div>


            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading
                ? "Creating Account..."
                : "Create an Account"}
            </button>


            {/* BACKEND MESSAGE */}
            {message && (
              <p className="form-message">
                {message}
              </p>
            )}

          </form>

        </div>

      </section>

    </div>
  );
}

export default SignupForm;
