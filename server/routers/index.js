const express = require("express");
const router = express.Router();
const postRouter = require("./postRouter");
const userRouter = require("./userRouter");
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.use("/users", userRouter);
router.use("/posts", postRouter);

module.exports = router;
