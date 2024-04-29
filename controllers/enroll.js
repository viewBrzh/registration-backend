const Enrollment = require('../models/enroll');

exports.enrollCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.body.userId;

        // Check if the user is already enrolled in the course
        const existingEnrollment = await Enrollment.findByCourseIdAndUserId(courseId, userId);
        if (existingEnrollment) {
            return res.status(400).json({
                message: 'You already enrolled in the course',
                result: false
            });
        }

        // Create a new enrollment record
        await Enrollment.enroll(courseId, userId);

        res.status(200).json({
            message: 'Enrollment successful',
            result: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to enroll user in the course',
            error: error.message,
            result: false
        });
    }
};


exports.getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll();
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch enrollments',
            error: error.message
        });
    }
};

exports.findByCourseId = async (req, res) => {
    try {
        const courseId = req.params.course_id;
        const enrollments = await Enrollment.findByCourseId(courseId);
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch enrollments',
            error: error.message
        });
    }
};

exports.findByUserId = async (req, res) => {
    const userId = req.params.user_id;
    try {
        const enrollments = await Enrollment.findByUserId(userId);
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch enrollments',
            error: error.message
        });
    }
};

exports.getEnrollmentById = async (req, res) => {
    try {
        const enrollId = req.params.enrollId;
        const enrollment = await Enrollment.findById(enrollId);
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(404).json({
            message: 'Enrollment not found',
            error: error.message
        });
    }
};

exports.updateEnrollment = async (req, res) => {
    try {
        const enrollId = req.params.enrollId;
        const { courseId, userId, enrollDate } = req.body;
        await Enrollment.update(enrollId, courseId, userId, enrollDate);
        res.status(200).json({
            message: 'Enrollment updated successfully',
            result: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update enrollment',
            error: error.message,
            result: false
        });
    }
};

exports.deleteEnrollment = async (req, res) => {
    try {
        const enrollId = req.params.enroll_id;
        await Enrollment.delete(enrollId);
        res.status(200).json({
            message: 'Enrollment deleted successfully',
            result: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete enrollment',
            error: error.message,
            result: false
        });
    }
};

exports.getCountByDepartment = async (req, res) => {
    try {
        const departmentName = req.params.departmentName;
        const count = await Enrollment.countByDepartment(departmentName);
        res.status(200).json({
            count,
            departmentName
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get enrollment count by department',
            error: error.message
        });
    }
};


