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
  origin: "https://eventroop-client.vercel.app",
  credentials: true
}));

app.use(express.json());

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
const eventRoutes = require("./routes/eventRoutes")

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes)

app.get("/", (req, res) => {
  res.send("Hello World from Event App");
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
