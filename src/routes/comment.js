const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/auth");
const {handleCreateComment} = require("../controllers/comment.js");

router.post("/:blogId", authenticateUser, handleCreateComment);

module.exports = router;