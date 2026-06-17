const express = require("express");
const { authenticateUser } = require("../middlewares/auth");
const {handleCreateBlog,
     handleGetAllBlogs,
     handleGetSingleBlogs,
     handleUpdateBlog,
     handleDeleteBlog,
     handleGetDeletedBlogs,
     handleRestoreBlogs,
     handlePermanentDelete
} = require("../controllers/blog.js");
const router = express.Router();

router.post("/create", authenticateUser, handleCreateBlog);
router.get("/", authenticateUser, handleGetAllBlogs);
router.get("/deleted", authenticateUser, handleGetDeletedBlogs);
router.patch("/restore/:id", authenticateUser, handleRestoreBlogs);
router.get("/:id", authenticateUser, handleGetSingleBlogs);
router.patch("/:id", authenticateUser, handleUpdateBlog);
router.delete("/delete/:id", authenticateUser, handleDeleteBlog);
router.delete("/permanentDelete/:id", authenticateUser, handlePermanentDelete);

module.exports = router;