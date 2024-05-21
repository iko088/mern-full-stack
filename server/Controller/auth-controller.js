const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// Home page
const home = async (req, res) => {
  try {
    res.status(200).send(req.body);
  } catch (error) {
    console.log(error);
  }
};

// User Register logic
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "email already exist" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    res.status(201).json({
      message: "registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Register Internal server error",
      error: error.message,
    });
  }
};

// User Login logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      res.status(400).json({ message: "invalid credintional" });
    }

    const user = await userExist.comparePassword(password);
    console.log(user);

    if (user) {
      res.status(200).json({
        message: "login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "invalid email or password" });
    }
  } catch (error) {
    res.status(500).json("Login intervel server error ");
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData)
    res.status(200).json(userData)
  } catch (error) {
    console.log(`error from the user root ${error}`)
  }
}



module.exports = { home, register, login, user };
