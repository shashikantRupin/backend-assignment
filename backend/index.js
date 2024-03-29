const express = require("express");
const mongoose = require("./config/db");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json()); 
// Middleware for handling JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("JSON Parsing Error:", err.message);
    return res.status(400).json({ message: "Invalid JSON" });
  }
  next();
});
//Basic route to check server is running or not
app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
