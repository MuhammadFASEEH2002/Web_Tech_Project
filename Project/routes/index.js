import express from "express";
const router = express.Router();
import * as teacherCtrl from '../controllers/TeacherController.js';
import * as CoursesCtrl from '../controllers/CoursesController.js'
import * as authCtrl from '../controllers/AuthController.js'
import multer from 'multer'
// const multer = require("multer");
import path from 'path';

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

router.get("/msg", (req, res) => {
  res.json({ msg: "Hello World" });
});

// router.get('/teachers' , teacherCtrl.getallTeachers)
// router.get('/courses' , CoursesCtrl.getAllcourses)
router.post('/courses' , CoursesCtrl.getCourse)
router.post('/post-best' , upload.single("file"),CoursesCtrl.postBest)

router.get('/me' , authCtrl.getMe)


export default router;