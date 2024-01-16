import express from "express";
const router = express.Router();

import * as teacherCtrl from '../controllers/TeacherController.js';
import * as CoursesCtrl from '../controllers/CoursesController.js'
import * as authCtrl from '../controllers/AuthController.js'
import * as uploadCtrl from '../controllers/uploadController.js'

import uploadMiddleWare from "../middleware/uploadMiddleWare.js";

router.get("/msg", (req, res) => {
  res.json({ msg: "Hello World" });
});

// router.get('/teachers' , teacherCtrl.getallTeachers)
// router.get('/courses' , CoursesCtrl.getAllcourses)

router.get('/me', authCtrl.getMe)
router.post('/search', CoursesCtrl.searchCourse)
router.post('/courses', CoursesCtrl.getCourse)
router.post('/files', CoursesCtrl.getfiles)
router.post("/upload/pdf", uploadMiddleWare.single("pdf"), uploadCtrl.uploadFile );

router.delete('/file/:id', CoursesCtrl.removeFile)

export default router;