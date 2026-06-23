const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const planRoutes = require("./routes/planRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "FitLife API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "API endpoint not found"
  });
});

module.exports = app;