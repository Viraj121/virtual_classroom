const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/authRoutes");
const classRoutes = require("./routes/classRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const commentRoutes = require("./routes/commentRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/comments", commentRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
