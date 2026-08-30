const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pincodeRoutes = require("./routes/pincodeRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const initializeDatabase = require("./database/initDatabase");

const app = express();

// Enable CORS for frontend requests
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Read JSON data
app.use(express.json());

// Pincode routes
app.use("/api", pincodeRoutes);

// Registration routes
app.use("/api", registrationRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Registration backend is running");
});

// Use Render's PORT or local fallback
const PORT = process.env.PORT || 5000;

// Initialize database before starting server
async function startServer() {
  try {
    await initializeDatabase();
    console.log("Database is ready");
  } catch (error) {
    console.error(
      "Fatal: could not initialize database.",
      error.message
    );
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Start server
startServer();