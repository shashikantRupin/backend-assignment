
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign(
    { username: user.username, roles: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  try {
    const { username, password, roles } = req.body;

    // Check if the user with the given username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new user
    const newUser = new User({ username, password, roles });
    await newUser.save();

    // Generate and return a token for the newly created user
    const token = generateToken(newUser);
    res.json( token );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  login,
  signup,
};
