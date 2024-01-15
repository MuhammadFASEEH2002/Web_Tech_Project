import db from '../models/index.js';


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



export const postBest  = async (req, res) => {
   const course = await db.Courses.findById(req.body.courseId);
   console.log(course);
   // console.log(req.file.filename);
   if(course){
           const courseUpgrade = await db.Courses.findByIdAndUpdate({_id: req.body.courseID},{best: req.file.filename})
           res.json({ message: "user created", status: true });
   }
}

