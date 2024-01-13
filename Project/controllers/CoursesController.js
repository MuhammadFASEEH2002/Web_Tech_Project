import db from '../models/index.js'


export const getAllcourses = async (req , res) =>{
   const courses  = await db.Courses.find();
   res.json({ courses })
}