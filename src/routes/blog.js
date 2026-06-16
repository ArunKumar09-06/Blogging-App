const express = require("express");
const { authenticateUser } = require("../middlewares/auth");
const {handleCreateBlog,
     handleGetAllBlogs,
     handleGetSingleBlogs
} = require("../controllers/blog.js");
const router = express.Router();

router.post("/create", authenticateUser, handleCreateBlog);
router.get("/", authenticateUser, handleGetAllBlogs);
router.get("/:id", authenticateUser, handleGetSingleBlogs);


module.exports = router;