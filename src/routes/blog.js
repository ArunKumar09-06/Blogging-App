const express = require("express");
const { authenticateUser } = require("../middlewares/auth");
const {handleCreateBlog,
     handleGetAllBlogs,
     handleGetMyBlogs,
     handleGetSingleBlogs,
     handleUpdateBlog,
     handleDeleteBlog,
     handleGetDeletedBlogs,
     handleRestoreBlogs,
     handlePermanentDelete
} = require("../controllers/blog.js");
const router = express.Router();

const upload = require("../middlewares/multer.js");

router.post("/create", authenticateUser, upload.single("coverImage"),handleCreateBlog);
router.get("/", authenticateUser, handleGetAllBlogs);
router.get("/my-blogs", authenticateUser, handleGetMyBlogs);
router.get("/deleted", authenticateUser, handleGetDeletedBlogs);
router.patch("/restore/:id", authenticateUser, handleRestoreBlogs);
router.get("/:id", authenticateUser, handleGetSingleBlogs);
router.patch("/:id", authenticateUser, upload.single("coverImage"), handleUpdateBlog);
router.delete("/delete/:id", authenticateUser, handleDeleteBlog);
router.delete("/permanentDelete/:id", authenticateUser, handlePermanentDelete);

module.exports = router;