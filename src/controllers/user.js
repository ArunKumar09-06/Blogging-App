const bcrypt = require('bcrypt');
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");


async function handleUserSignup(req, res) {
     try {
          const {fullName, email, password} = req.body;
          if (!fullName || !email || !password) {
               return res.status(400).json({
                    message: "All fields are required"
               });
          }

          const user = await User.findOne({ email });
          if (user) {
               return res.status(409).json({
                    message: "User Already Exists"
               });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const createdUser = await User.create({
               fullName,
               email,
               password: hashedPassword
          });

          return res.status(201).json({
               message: "User created successfully",
               user : {
                    id : createdUser._id,
                    fullName: createdUser.fullName,
                    email: createdUser.email
               }
          });
     }
     catch (err) {
          return res.status(500).json({
               message: "Internal Error while Signup",
               error: err.message
          });
     }
}

async function handleUserLogin(req, res){
     try{
          const body = req.body;
          const email = body.email;
          const password = body.password;

          const user = await User.findOne({email});
          if(!user){
               return res.status(404).json({
                    message: "User Not found",
               });
          }

          const hashedPassword = user.password;
          const compare = await bcrypt.compare(password, hashedPassword);

          if(!compare){
               return res.status(401).json({
                    message: "Password not corrrect",
               });
          }

          const token = jwt.sign(
               {
               id: user._id,
               email: user.email,
               role: user.role,
               },
               process.env.JWT_SECRET,
               {
                    expiresIn: "1d",
               }
          )

          res.cookie("token", token, {
               httpOnly: true,
          })

          return res.status(200).json({
               message: "User Logged in"
          })
     }
     catch(err){
          return res.status(500).json({
               message: "Error while logging in",
               error: err.message
          });
     }
}

async function handleLogout(req, res){
     try{
          res.clearCookie("token");
          return res.status(200).json({
               message: "Logout Successful",
          })
     } catch(err){
          return res.status(500).json({
               message: "Error while logging out",
          })
     }
}

module.exports = {
     handleUserSignup,
     handleUserLogin,
     handleLogout
}