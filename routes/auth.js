const express = require("express");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/sign-up", authController.getSignUp);

router.post("/sign-up", authController.postSignUp);

// router.get("/log-in", authController.getLogIn);

// router.post("/log-in", authController.postLogIn);

// router.post("/log-out", authController.postLogOut);

module.exports = router;
