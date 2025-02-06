require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPassword });
  res.json({ success: true });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.json({ success: false, message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
  res.json({ success: true, token });
});

app.listen(5000, () => console.log("Server running on port 5000"));
