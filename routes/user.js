const express = require("express");

const router = express.Router();

const userController = require("../controllers/users");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(userController.signupUser);

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(userController.loginUser);

router.get(
    "/logout",
    userController.logoutUser
);

module.exports = router;