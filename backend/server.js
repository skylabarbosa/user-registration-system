const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pincodeRoutes = require("./routes/pincodeRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const initializeDatabase = require("./database/initDatabase");

const app = express();

// Allow requests from configured frontend origins.
// In production, set FRONTEND_URL to your deployed frontend domain.
// For multiple origins, use a comma-separated value.
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Allows Express to read JSON data sent from React
app.use(express.json());

// Pincode related routes
app.use("/api", pincodeRoutes);

// Registration related routes
app.use("/api", registrationRoutes);

// Simple route to check whether the backend is running
app.get("/", (req, res) => {
  res.send("Registration backend is running");
});

// Use PORT from environment (required for cloud platforms) with a local fallback
const PORT = process.env.PORT || 5000;

// Set up the database before starting the server
async function startServer() {
  try {
    await initializeDatabase();
  } catch (error) {
    console.error("Fatal: could not initialize database. Exiting.", error.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
