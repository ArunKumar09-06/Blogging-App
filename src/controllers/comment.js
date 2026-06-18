const Comment = require("../models/comment");
const Blog = require("../models/blog");

async function handleCreateComment(req, res){
     try{
          const blogId = req.params.blogId;
          const createdById = req.user.id;
          const content = req.body.content;

          if(!content || !content.toString().trim()){
               return res.status(400).json({
                    message: "Comment content is required",
               });
          }

          const blog = await Blog.findById(blogId);
          if(!blog){
               return res.status(404).json({
                    message: "Blog does not exist"
               });
          }

          if(blog.isDeleted){
               return res.status(400).json({
                    message: "Cannot add comments to a deleted blog",
               });
          }

          const comment = await Comment.create({
               content: content.toString().trim(),
               createdBy: createdById,
               blogId
          });

          return res.status(201).json({
               message: "Comment created successfully",
               comment,
          });
     }
     catch(err){
          return res.status(500).json({
               message: "Error while creating comment",
               error: err.message,
          });
     }
}

async function handleGetComments(req, res){
     try{
          const blogId = req.params.blogId;
          const blog = await Blog.findById(blogId);
          if(!blog){
               return res.status(404).json({
                    message: "Blog not found",
               });
          }

          if(blog.isDeleted){
               return res.status(400).json({
                    message: "Cannot view comments of a deleted blog",
               });
          }

          const comments = await Comment.find({ blogId })
               .sort({ createdAt: -1 })
               .populate("createdBy", "fullName profileImage");

          return res.status(200).json({
               message: "Comments fetched successfully",
               comments,
          });
     }
     catch(err){
          return res.status(500).json({
               message: "Error while getting comments",
               error: err.message,
          });
     }
}

async function handleUpdateComment(req, res){
     try{
          const commentId = req.params.commentId;
          const content = req.body.content;
          const allowedFields = Object.keys(req.body);

          if(allowedFields.length === 0){
               return res.status(400).json({
                    message: "No update fields provided",
               });
          }

          if(allowedFields.some(field => field !== "content")){
               return res.status(400).json({
                    message: "Only the content field can be updated",
               });
          }

          if(!content || !content.toString().trim()){
               return res.status(400).json({
                    message: "Comment content is required",
               });
          }

          const comment = await Comment.findById(commentId);
          if(!comment){
               return res.status(404).json({
                    message: "Comment not found",
               });
          }

          if(comment.createdBy.toString() !== req.user.id){
               return res.status(403).json({
                    message: "Forbidden: you can only update your own comment",
               });
          }

          comment.content = content.toString().trim();
          await comment.save();
          await comment.populate("createdBy", "fullName profileImage");

          return res.status(200).json({
               message: "Comment updated successfully",
               comment,
          });
     }
     catch(err){
          return res.status(500).json({
               message: "Error while updating comment",
               error: err.message,
          });
     }
}

async function handleDeleteComment(req, res){
     try{
          const commentId = req.params.commentId;
          const comment = await Comment.findById(commentId);

          if(!comment){
               return res.status(404).json({
                    message: "Comment not found",
               });
          }

          if(comment.createdBy.toString() !== req.user.id){
               return res.status(403).json({
                    message: "Forbidden: you can only delete your own comment",
               });
          }

          await Comment.findByIdAndDelete(commentId);

          return res.status(200).json({
               message: "Comment deleted successfully",
          });
     }
     catch(err){
          return res.status(500).json({
               message: "Error while deleting comment",
               error: err.message,
          });
     }
}

module.exports = {
     handleCreateComment,
     handleGetComments,
     handleUpdateComment,
     handleDeleteComment,
};