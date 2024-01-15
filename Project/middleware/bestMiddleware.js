import multer from 'multer'
// const multer = require("multer");
import path from 'path';

 export const best = async (req, res, next) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "upload/");
        },
        filename: (req, file, cb) => {
          // console.log(file)
          cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
          );
        },
      });
      const upload= multer({
        storage :storage
      })
      upload.single("file");
 }