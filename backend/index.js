// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Routes
const userRoutes = require("./routes/userRoutes");

// Load Environment variables
dotenv.config();

// Initialize the App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error(`MongoDB connection error ${error}`);
  });

// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }

// Use Routes
app.use("/api/users", userRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
