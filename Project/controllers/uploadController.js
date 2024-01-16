import db from '../models/index.js'
import fs from 'fs'
import path from 'path';

export const uploadFile = async (req, res) => {
    try {
        const __dirname = path.resolve(path.dirname(''));
        const course = await db.Courses.findById(req.body.course_id);

        let dir = `uploads/semester_${course.semester}/${course.course}/SEC_${course.section}/TYPE_${req.body.type}/`;
        let sourceDirectory = path.join(__dirname, `public/${dir}`);
        let fileTempPath = path.join(__dirname, `public/pdfs/${req.body.filename}`);
        console.log(sourceDirectory);
        
        if (!fs.existsSync(sourceDirectory)) {
          fs.mkdirSync(sourceDirectory, { recursive: true });
        }
        
    
        
        // Construct the destination file path
        const destinationFilePath = path.join(sourceDirectory, req.body.filename);
        
        // Copy the file
        fs.copyFileSync(fileTempPath, destinationFilePath);
        
        // Delete the source file
        fs.unlinkSync(fileTempPath);

        const file = await db.Files.create({
          type : req.body.type,
          filePath : dir + req.body.filename,
          course : req.body.course_id,
          fileName : req.body.filename
        })

        console.log(req.body)
        // /semester_1/Introduction to Computer Science/SEC_A/TYPE_BEST/example.pdf
        return res.status(200).json({
          status : true,
          msg: "File uploaded successfully",
          filename: req.body.filename,
          url: `${process.env.APP_URL + dir + req.body.filename}`,
          file : file._doc

        });
      } catch (error) {
        console.error(error);
      }
}
