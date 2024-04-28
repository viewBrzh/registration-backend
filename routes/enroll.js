const express = require('express');
const router = express.Router();
const Enrollment = require('../controllers/enroll');

router.get('/get-all', Enrollment.getAllEnrollments);

router.get('/get-data/:enroll_id', Enrollment.getEnrollmentById);

router.put('/update/:enroll_id', Enrollment.updateEnrollment);

router.post('/create', Enrollment.enrollCourse);

router.delete('/delete/:enroll_id', Enrollment.deleteEnrollment);

router.get('/get-by-user/:user_id', Enrollment.findByUserId);

router.get('/get-byCourse/:course_id', Enrollment.findByCourseId);

router.get('/getCoutByDepartment/:departmentName', Enrollment.getCountByDepartment);

module.exports = router;
