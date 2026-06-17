const Comment = require("../models/comment");
const Blog = require("../models/blog");

async function handleCreateComment(req, res){
     try{
          const blogId = req.params.blogId;
          const createdById = req.user.id;
          const content = req.body.content;

          if(!content){
               return res.status(400).json({
                    message: "Comment content is required",
               });
          }

          const blog = await Blog.findById(blogId);

          if(!blog){
               return res.status(404).json({
                    message: "Blog does not exists"
               })
          }

          if(blog.isDeleted){
               return res.status(400).json({
                    message: "Bad Request the blog is already deleted",
               });
          }

          const comment = await Comment.create({
               content,
               createdBy: createdById,
               blogId
          })

          return res.status(201).json({
               message: "Comment created successfully",
               comment
          })
     }
     catch(err){
          return res.status(500).json({
               message: "Error while creating comment",
               error: err.message,
          })
     }
}

async function handleGetComment(req, res){
     try{
          
     }
     catch(err){
          return res.status(500).json({
               message: "Error while getting the comments"
          });
     }
}

module.exports = {
     handleCreateComment,
}