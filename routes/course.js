const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/course');

router.get('/', (req, res) => {
    res.json({ message: 'Hello from /course/get-all' });
  });

router.get('/get-all', CourseController.getAllCourses);

router.get('/get-data/:courseId', CourseController.getEditCourse);

router.put('/update/:courseId', CourseController.editCourse);

router.post('/create', CourseController.addCourse);

router.delete('/delete/:courseId', CourseController.deleteCourse);

router.put('/set-publish/:courseId', CourseController.setPublishCourse);

router.get('/:courseId/enrollCount', CourseController.getEnrollCountForCourse);

router.get('/:courseId/enrollCount/:year', CourseController.getEnrollCountForCourseByYear);

router.put('/:courseId/update-skills', CourseController.updateSkills);

router.get('/courseByYear/:year', CourseController.getCourseByYear);

module.exports = router;
