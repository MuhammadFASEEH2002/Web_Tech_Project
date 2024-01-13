import express from "express";
const router = express.Router();

import * as teacherCtrl from '../controllers/TeacherController.js';
import * as CoursesCtrl from '../controllers/CoursesController.js'
import * as authCtrl from '../controllers/AuthController.js'

router.get("/msg", (req, res) => {
  res.json({ msg: "Hello World" });
});

// router.get('/teachers' , teacherCtrl.getallTeachers)
// router.get('/courses' , CoursesCtrl.getAllcourses)
router.post('/courses' , CoursesCtrl.getCourse)
router.get('/me' , authCtrl.getMe)

export default router;