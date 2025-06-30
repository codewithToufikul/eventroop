const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
console.log(databaseUser)
const uri =
  `mongodb+srv://${databaseUser}:${databasePassword}@cluster0.ivo4yuq.mongodb.net/eventroop?retryWrites=true&w=majority&appName=Cluster0`;
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true
}));
// Middleware
// app.use(cors());
app.use(express.json());

// MongoDB connect using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB with mongoose");
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello World from MERN Event App 👋");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
