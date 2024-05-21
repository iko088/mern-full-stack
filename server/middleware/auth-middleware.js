const jwt = require("jsonwebtoken");
const User = require('../models/user-model')

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token)

  if (!token) {
    return res
      .status(401)
      .json({ message: "unAuthorized HTTP, Token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  console.log("Token from auth middle ware", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRECT_KEY);

    const userData = await User.findOne({email: isVerified.email}).select({password:0})
    console.log(userData);

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "unAuthorized HTTP, Token not provided" });
  }
};

module.exports = authMiddleware;
