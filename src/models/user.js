const { Schema, model } = require("mongoose");

const userSchema = new Schema({
     fullName: {
          type: String,
          required: true,
          trim: true
     },
     email:{
          type: String,
          required: true,
          unique: true,
          trim: true,
          lowercase: true
     },
     password:{
          type: String,
          required: true,
          minlength: 6
     },
     profileImage:{
          type: String,
          default: "/images/default.png"
     },
     role:{
          type: String,
          enum: ["USER", "ADMIN"],
          default: "USER"
     }
}, {timestamps: true})

const User = model("User", userSchema);

module.exports = User;