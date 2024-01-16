import db from '../models/index.js'
import path from 'path'
import fs from 'fs'


export const getAllcourses = async (req, res) => {
   const courses = await db.Courses.find();
   res.json({ courses })
}
export const getCourse = async (req, res) => {
   try {
      const courses = await db.Courses.find({
         $or: [
            { teacher: { $regex: req.body.teacher, $options: "i" } },
         ]
      })
      res.json({ status : true , courses })
   } catch (error) {
      res.json({ status : false , message : error.message })
   }
}
export const searchCourse = async (req, res) => {
   try {
      const courses = await db.Courses.find({
         $or: [
            { teacher: { $regex: req.body.search, $options: "i" } },
            { course: { $regex: req.body.search, $options: "i" } }
         ]
      });
      res.json({ status: true, courses });
   } catch (error) {
      res.json({ status: false, message: error.message });
   }
};
export const getfiles = async (req, res) =>{
   try {
      const files = await db.Files.find({ course : req.body.courseId , type : req.body.type }).populate('course')
      res.json({ status : true , files })
   } catch (error) {
      res.json({ status : false , message : error.message })
   }
}

export const removeFile = async (req, res) =>{
   
   const file = await db.Files.findById(req.params.id);
   if (!file) {
      return res.status(404).json({ status : false , error: 'File not found' });
    }
    

    console.log(file)

    const __dirname = path.resolve(path.dirname(''));
    fs.unlinkSync(path.join(__dirname, 'public', file.filePath))
    await file.deleteOne();

    
    
    return res.status(200).json({ status : true, message: 'File deleted successfully' });
}