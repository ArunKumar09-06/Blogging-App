const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/auth");
const {
     handleCreateComment,
     handleGetComments,
     handleUpdateComment,
     handleDeleteComment,
} = require("../controllers/comment.js");

router.post("/:blogId", authenticateUser, handleCreateComment);
router.get("/:blogId", authenticateUser, handleGetComments);
router.patch("/:commentId", authenticateUser, handleUpdateComment);
router.delete("/:commentId", authenticateUser, handleDeleteComment);

module.exports = router;