const express = require('express');
const router = express.Router();
const Enrollment = require('../controllers/enroll');

router.get('/get-all', Enrollment.getAllEnrollments);

router.get('/get-data/:enroll_id', Enrollment.getEnrollmentById);

router.put('/update/:enroll_id', Enrollment.updateEnrollment);

router.post('/create/:courseId', Enrollment.enrollCourse);

router.delete('/delete/:enroll_id', Enrollment.deleteEnrollment);

router.get('/get-by-user/:user_id', Enrollment.findByUserId);

router.get('/get-byCourse/:course_id', Enrollment.findByCourseId);

router.get('/getCoutByDepartment/:departmentName', Enrollment.getCountByDepartment);

router.get('/getUserHistory/:user_id', Enrollment.getCourseByUserId);

router.put('/updateEnrollStatus/:enroll_id', Enrollment.UpdateStatusById);

router.get('/getCount', Enrollment.CountEnroll);

router.get('/byYear/:year', Enrollment.getEnrollByYear);

router.get('/countByYear/:year', Enrollment.CountEnrollByYear);

router.get('/countDepartmentByYear/:department/:year', Enrollment.getDepartmentByYear);

router.get('/getNoti/:user_id', Enrollment.getNotiByuserId);

router.get('/getCouseType/:department/:year', Enrollment.getCourseTypeByDepartment);

router.get('/getUser/:department/:year', Enrollment.getUserStatusByDepartment);

router.get('/getEnrollCount/:course_id', Enrollment.getCountByCourse);

router.get('/getUserNoti/:user_id', Enrollment.getDateNotiByuserId);

router.get('/getCourseLimit/:course_id', Enrollment.getCourseLimit);

module.exports = router;
