const multer = require('multer');
const fs = require('fs');
const path = require('path');
const multerStorage = multer.diskStorage({

    destination: (req, file, cb) => {
      // Get the type of file.
      const ext = file.mimetype.split("/")[0];
      const baseDir = 'public/uploads';
      const dir = path.join(baseDir, req.body.id);
      if (ext === "image"){
        fs.access(dir, (error) => {
          if (error) {
              // Directory does not exist, create it
              fs.mkdir(dir, { recursive: true }, (err) => {
                  if (err) {
                    console.error('Error creating directory:', err);
                    cb(err, baseDir); // Proceed with the baseDir if there's an error
                  } else {
                    cb(null, dir); // Use the newly created directory
                  }
              });
          } 
          else {
            // Directory exists, proceed
            cb(null, dir);
          }
        });
      }
      else{
        cb(null, "D:/Users/bento/OneDrive/Desktop/ecommerce_application/public/others");
      }
    },
    filename: (req, file, cb) => {
      if (!req.fileCounter) {
        req.fileCounter = 1;
      }
      const numberedFileName = `${req.body.id}-${req.fileCounter}.jpeg`                  //This is the unique name of the file which has the unique id of the form request along with a counter that indicates the number of the file that is used.  
      req.fileCounter++;
      cb(null, numberedFileName);
    },
});
const upload = multer({ storage: multerStorage });

module.exports = upload;