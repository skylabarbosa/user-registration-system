import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./Confirmation.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [user, setUser] = useState(location.state || null);
  const userId = location.state?.userId || searchParams.get("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/", { replace: true });
      return;
    }

    async function loadRegisteredUser() {
      try {
        const response = await fetch(`${API_URL}/api/register/${userId}`);
        const data = await response.json();

        if (!response.ok) {
          navigate("/", { replace: true });
          return;
        }

        setUser({
          userId: data.user.id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
          pincode: data.user.pincode,
        });
      } catch (error) {
        console.error("Could not load registration details:", error);
        navigate("/", { replace: true });
      }
    }

    loadRegisteredUser();
  }, [userId, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="confirmation-page">

      <div className="confirmation-card">

        <div className="success-icon">
          ✓
        </div>

        <p className="confirmation-small-heading">
          REGISTRATION COMPLETE
        </p>

        <h1>
          Registration Successful!
        </h1>

        <h2>
          Welcome, {user.firstName}
        </h2>

        <p className="confirmation-subtitle">
          Your account has been created successfully.
        </p>


        <div className="registration-details">

          <div className="detail-row">
            <span>First Name</span>
            <strong>{user.firstName}</strong>
          </div>

          <div className="detail-row">
            <span>Last Name</span>
            <strong>{user.lastName}</strong>
          </div>

          <div className="detail-row">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="detail-row">
            <span>Phone Number</span>
            <strong>{user.phone}</strong>
          </div>

          <div className="detail-row">
            <span>Pincode</span>
            <strong>{user.pincode}</strong>
          </div>

        </div>


        <button
          className="confirmation-button"
          onClick={() => navigate("/")}
        >
          Back to Registration
        </button>

      </div>

    </div>
  );
}

export default Confirmation;
