const {Schema, model} = require("mongoose");

const blogSchema = new Schema({
     title: {
          type: String,
          required: true,
          trim : true
     },
     body: {
          type: String, 
          required: true,
     },
     coverImageUrl:{
          type: String,
          default: "/images/defaultCover.png"
     },
     createdBy:{
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
     },
}, {timestamps: true});

const Blog = model("Blog", blogSchema);

module.exports = Blog;

