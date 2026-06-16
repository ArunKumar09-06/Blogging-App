const Blog = require("../models/blog");

async function handleCreateBlog(req, res) {
     try {
          const { title, body } = req.body;
          if (!title || !body) {
               return res.status(400).json({
                    message: "All fields are required"
               });
          }

          const userId = req.user.id;

          const blog = await Blog.create({
               title,
               body,
               createdBy: userId
          })

          return res.status(201).json({
               message: "Blog created successfully",
               blog
          });
     }
     catch (err) {
          return res.status(500).json({
               message: "Error while creating blog",
               error: err.message
          });
     }
}

async function handleGetAllBlogs(req, res){
     try{
          const userId = req.user.id;
          const blogs = await Blog.find({
               createdBy: userId
          });

          return res.status(200).json({
               message: "Fetched all blogs",
               blogs
          });
     }
     catch(err){
          return res.status(500).json({
               message: "Error while getting the blogs",
               error: err.message
          });
     }
}

async function handleGetSingleBlogs(req, res){
     try{
          const blogId = req.params.id;
          const userId = req.user.id;

          const blog = await Blog.findById(blogId);

          if(!blog){
               return res.status(404).json({
                    message: "Blog not found",
               })
          }
          
          return res.status(200).json({
               message: "Fetched the blog with the given id",
               blog
          });
     }
     catch(err){
          return res.status(500).json({
               message: "Error while Getting the blog",
               error: err.message
          });
     }
}

module.exports = {
     handleCreateBlog,
     handleGetAllBlogs,
     handleGetSingleBlogs
}