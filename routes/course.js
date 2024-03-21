const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/course');

router.get('/get-all', CourseController.getAllCourses);

router.get('/get-data/:courseId', CourseController.getEditCourse);

router.put('/update/:courseId', CourseController.editCourse);

router.post('/create', CourseController.addCourse);

router.delete('/delete/:courseId', CourseController.deleteCourse);

module.exports = router;
