import db from '../models/index.js'


export const getallTeachers = async (req , res) =>{
   const teachers = await db.Teachers.find();
   res.json({teachers})
}