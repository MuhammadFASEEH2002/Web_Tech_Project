import db from '../models/index.js'


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