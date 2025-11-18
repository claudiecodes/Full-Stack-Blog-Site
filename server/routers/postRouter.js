const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const postController = require("../controllers/postController");
const authorization = require("../middlewares/authorization");

router.get("/", postController.read);
router.get("/:postId", postController.detailById)

router.use(authentication);

router.post("/", postController.create);
router.put("/:postId", postController.update);
router.delete("/:postId", authorization, postController.delete);

module.exports = router;
