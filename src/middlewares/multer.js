const multer = require("multer");
const {nanoid} = require("nanoid");
const path = require("path");

const storage = multer.diskStorage({
     destination: function(req, file, cb){
          cb(null, "uploads/");
     },
     filename: function(req, file, cb){
          const extension = path.extname(file.originalname);
          const fileName = nanoid(10) + extension;
          cb(null, fileName);
     }
});

const fileFilter = (req, file, cb) => {
     const allowedExtensions = [".jpg", ".png", ".jpeg", ".webp"];
     const extension = path.extname(file.originalname.toLowerCase());

     if(!allowedExtensions.includes(extension)){
          return cb(new Error("Only JPG, JPEG, WEBP and PNG images are allowed"), false);
     }

     cb(null, true);
}

const upload = multer({
     storage,
     limits: {
          fileSize: 5 * 1024 * 1024,
     },
     fileFilter
});

module.exports = upload;