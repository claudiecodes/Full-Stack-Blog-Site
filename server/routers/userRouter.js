
const express = require("express");
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");


const router = express.Router();

router.get("/", userController.read)
router.use(authentication)
router.delete("/", userController.delete)


module.exports = router;

  