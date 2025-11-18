
const express = require("express");
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");


const router = express.Router();

router.get("/", userController.read)
router.use(authentication)
router.delete("/", userController.delete)
router.get("/profile",userController.postByAuthorId)


module.exports = router;

