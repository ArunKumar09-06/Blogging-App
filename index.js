const express = require('express');
const cookieParser = require("cookie-parser");
const {connectDB} = require("./src/config/db.js");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./src/routes/user.js");
const blogRouter = require("./src/routes/blog.js");
const commentRouter = require("./src/routes/comment.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
     res.json({
          message: "Blog app running"
     });
})

async function start(){
     try{
          await connectDB(process.env.MONGO_URL);
          console.log("MongoDB Connected");
          app.listen(process.env.PORT, () => console.log(`Server Started at port ${process.env.PORT}`));
     }
     catch(err){
          console.log(err);
          process.exit(1);
     }
}

start();
