const multer = require("multer");

function errorHandler(err, req, res, next){
     if(err instanceof multer.MulterError){
          if(err.code === "LIMIT_FILE_SIZE"){
               return res.status(400).json({
                    success: false,
                    message: "Image size should not exceed 5 MB",
               });
          }

          return res.status(400).json({
               success: false,
               message: err.message
          });
     }

     if(err.message === "Only JPG, JPEG, WEBP and PNG images are allowed"){
          return res.status(400).json({
               success: false,
               message:  err.message
          });
     }

     return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: err.message
     });
}

module.exports = errorHandler;