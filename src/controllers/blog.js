const Blog = require("../models/blog");

async function handleCreateBlog(req, res) {
     try {
          console.log(req.body);
          console.log(req.files);
          console.log(req.file);

          const { title, body } = req.body;
          if (!title || !body) {
               return res.status(400).json({
                    message: "All fields are required"
               });
          }

          const userId = req.user.id;

          const coverImageUrl = req.file ? "/uploads/" + req.file.filename : "/images/defaultCover.png"
          const blog = await Blog.create({
               title,
               body,
               coverImageUrl,
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
               isDeleted: false
          }).populate(
               "createdBy",
               "fullName"
          );

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

async function handleGetMyBlogs(req, res){
     try{
          const userId = req.user.id;
          const blogs = await Blog.find({
               createdBy: userId,
               isDeleted: false
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

async function handleUpdateBlog(req, res){
     try{
          const blogId = req.params.id;
          const { title, body } = req.body;
          const blog = await Blog.findById(blogId);

          if(!blog){
               return res.status(404).json({
                    message: "Blog not found"
               });
          }

          // ownership check 
          if(blog.createdBy.toString() !== req.user.id){
               return res.status(403).json({
                    message: "You are not allowed to update this blog"
               });
          }

          if(title){
               blog.title = title;
          }
          if(body){
               blog.body = body;
          }
          await blog.save();

          return res.status(200).json({
               message: "Blog Updated Successfully",
               blog,
          });

     }
     catch(err){
          return res.status(500).json({
               message: "Error while updating the blog",
               error: err.message,
          })
     }
}

async function handleDeleteBlog(req, res){
     try{
          const blogId = req.params.id;
          const createdById = req.user.id;

          const blog = await Blog.findById(blogId);
          if(!blog){
               return res.status(400).json({
                    message: "Blog not found"
               });
          }

          if(blog.createdBy.toString() !== createdById){
               return res.status(403),json({
                    message: "You are not allowed to delete this blog",
               });
          }

          blog.isDeleted = true;
          await blog.save();
          return res.status(200).json({
               message: "Blog Deletion successful",
          })
     } catch(err){
          return res.status(500).json({
               message: "Error while deleting the Blog",
               error: err.message
          })
     }
}

async function handleGetDeletedBlogs(req, res){
     try{
          const createdById = req.user.id;
          const blogs = await Blog.find({
               createdBy: createdById,
               isDeleted: true
          });

          if(blogs.length == 0){
               return res.status(200).json({
                    message: "There are no blogs which are deleted",
               })
          }

          return res.status(200).json({
               message: "Deleted blogs are: ",
               blogs
          })
     } catch(err){
          return res.status(500).json({
               message: "Error while reteriving deleted blogs",
               error: err.message
          })
     }
}

async function handleRestoreBlogs(req, res){
     try{
          const blogId = req.params.id;
          const createdById = req.user.id;

          const blog = await Blog.findById(blogId);
          if(!blog){
               return res.status(404).json({
                    message: "Blog doesn't exists",
               });
          }

          if(blog.createdBy.toString() !== createdById){
               return res.status(403).json({
                    message: "You are not allowed to delete this blog",
               });
          }

          blog.isDeleted = false;
          await blog.save();
          return res.status(200).json({
               message: "Blog Restored Successfully",
               blog
          })
     } catch(err){
          return res.status(500).json({
               message: "Error while restoring the deleteb blogs",
               error: err.message
          })
     }
}

async function handlePermanentDelete(req, res){
     try{
          const blogId = req.params.id;
          const createdById = req.user.id;

          const blog = await Blog.findById(blogId);
          if(!blog){
               return res.status(404).json({
                    message: "Blog doesn't exists",
               });
          }

          if(blog.createdBy.toString() !== createdById){
               return res.status(403).json({
                    message: "You are not allowed to delete this blog",
               });
          }

          if(!blog.isDeleted){
               return res.status(400).json({
                    message: "Move blog to trash before permanently deleting",
               });
          }

          await blog.deleteOne();

          return res.status(200).json({
               message: "Blog permanently deleted"
          });
     } catch(err){
          return res.status(500).json({
               message: "Error while deleting",
          })
     }
}

module.exports = {
     handleCreateBlog,
     handleGetAllBlogs,
     handleGetMyBlogs,
     handleGetSingleBlogs,
     handleUpdateBlog,
     handleDeleteBlog,
     handleGetDeletedBlogs,
     handleRestoreBlogs,
     handlePermanentDelete
}