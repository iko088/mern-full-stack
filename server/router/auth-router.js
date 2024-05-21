const express = require('express');
const router = express.Router();
const authController = require('../Controller/auth-controller');
const validate = require("../middleware/validate-middleware")
const {signupSchema} = require("../validators/auth-validator");
const authMiddleware = require('../middleware/auth-middleware');

// Home route
router.route("/").get(authController.home);

// Register form route 
router.route("/register").post( validate(signupSchema), authController.register);

// Login form route 
router.route("/login").post(authController.login);

// user 
router.route("/user").get(authMiddleware,authController.user);

router.get('/', (req, res) => {
    res.send("hello this is auth-router page");
});

module.exports = router;
