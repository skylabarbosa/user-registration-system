const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pincodeRoutes = require("./routes/pincodeRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const initializeDatabase = require("./database/initDatabase");

const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://main.dx9b0mc91hz18.amplifyapp.com"
];

console.log("Allowed CORS origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Request origin:", origin);

      // Allow requests without origin and allowed frontend origins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },

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

// Render port
const PORT = process.env.PORT || 5000;

// Start database and server
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

startServer();