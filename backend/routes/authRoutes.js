

const express = require("express");
const authController = require("../controllers/authController");
const { logMiddleware } = require("../config/middleware");

const router = express.Router();

router.post("/login", logMiddleware, authController.login);
router.post("/signup", logMiddleware, authController.signup);
module.exports = router;
