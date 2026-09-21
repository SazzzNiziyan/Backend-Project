const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { username, email, fullname, password, role = "user" } = req.body;

  const userAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userAlreadyExist) {
    return res
      .status(409)
      .json({ message: "the user is already exist in the database" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    fullname,
    password : hash,
    role,
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    username: user.username,
    email: user.email,
    fullname: user.fullname,
    role: user.role,
    token,
  });
}

async function loginUser(req, res) {
  const { email, username, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid Credential" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Credential" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user Logged in",
    user: {
      username: user.username,
      email: user.email,
      fullname: user.fullname,
      role: user.role,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "user logged out" });
}

module.exports = { registerUser, loginUser, logoutUser };
