const fs = require("fs/promises");
const path = require("path");

async function deleteImage(imageUrl){
     if(!imageUrl || imageUrl === "/images/defaultCover.png"){
          return;
     }
     
     const imagePath = path.join(
          process.cwd(),
          imageUrl.replace(/^\//, "")
     );


     try{
          await fs.unlink(imagePath);
          console.log("Image deleted successfully");
     } catch(err) {
          console.error("Failed to delete the image: ", err.message);
     }
}

module.exports = {
     deleteImage
}