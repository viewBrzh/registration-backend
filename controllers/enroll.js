const Enrollment = require('../models/enroll');

exports.enrollCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.body.userId;

        // Check if the user is already enrolled in the course
        const existingEnrollment = await Enrollment.findByCourseIdAndUserId(courseId, userId);
        if (existingEnrollment) {
            return res.status(400).json({
                message: 'You are already enrolled in the course',
                result: false
            });
        }

        // Get the course limit
        const courseLimit = await Enrollment.getCourseLimit(courseId);
        if (courseLimit === null) {
            return res.status(404).json({
                message: 'Course not found',
                result: false
            });
        }

        // Count the current enrollments for the course
        const currentEnrollments = await Enrollment.getCountByCourse(courseId);
        const creentEnroll = currentEnrollments[0].count;
        console.log("course limit: " + courseLimit + ", enroll count :" + creentEnroll)
        // Check if the enrollment limit has been reached
        if (creentEnroll >= courseLimit) {
            return res.status(400).json({
                message: 'Enrollment limit reached for this course',
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

exports.getCourseByUserId = async (req, res) => {
    const userId = req.params.user_id;
    try {
        const courses = await Enrollment.getCourseByUserId(userId);
        res.status(200).json({
            courses
        })
    } catch (error) {
        res.status(500).json({
            message: 'Fail to get courses by user_id',
            error: error.message
        })
    }

}

exports.UpdateStatusById = async (req, res) => {
    const enrollId = req.params.enroll_id;
    const { status } = req.body;

    try {
        // Update status in the database
        const result = await Enrollment.updateStatus(enrollId, status);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Status updated successfully' });
        } else {
            res.status(404).json({ message: 'Enrollment not found' });
        }
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.CountEnroll = async (req, res) => {
    try {
        const count = await Enrollment.getCount();
        res.status(200).json(count)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

exports.CountEnrollByYear = async (req, res) => {
    let year = req.params.year;
    year = year - 543;
    try {
        const count = await Enrollment.getCountByYear(year);
        res.status(200).json(count)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

exports.getEnrollByYear = async (req, res) => {
    let year = req.params.year;
    year = year - 543;
    try {
        const count = await Enrollment.getErollByYear(year);
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

exports.getDepartmentByYear = async (req, res) => {
    let year = req.params.year;
    year = year - 543;
    const department = req.params.department;
    try {
        const count = await Enrollment.getDepartmentByYear(department, year);
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}


exports.getFacultyByYear = async (req, res) => {
    let year = req.params.year;
    year = year - 543;
    const faculty = req.params.faculty;
    try {
        const count = await Enrollment.getFacultyByYear(faculty, year);
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

exports.getNotiByuserId = async (req, res) => {
    const userId = req.params.user_id;
    try {
        const result = await Enrollment.getNotiByUserId(userId);
        res.status(200).json(result);
    } catch (error) {
        throw error;
    }
}

exports.getCourseTypeByFaculty = async (req, res) => {
    const faculty = req.params.faculty;
    let year = req.params.year;
    year = year - 543;
    try {
        const result = await Enrollment.getCourseTypeByFaculty(faculty, year)
        res.status(200).json(result);
    } catch (error) {
        throw error;
    }
}

exports.getUserStatusByFaculty = async (req, res) => {
    const faculty = req.params.faculty;
    let year = req.params.year;
    year = year - 543;
    try {
        const result = await Enrollment.getUserStatusByFacultys(faculty, year)
        res.status(200).json(result);
    } catch (error) {
        throw error;
    }
}

exports.getCountByCourse = async (req, res) => {
    const courseId = req.params.course_id;

    try {
        const result = await Enrollment.getCountByCourse(courseId)
        res.status(200).json(result[0]);
    } catch (error) {
        throw error;
    }
}

exports.getDateNotiByuserId = async (req, res) => {
    const userId = req.params.user_id;
    try {
        const result = await Enrollment.getDateNotiByUserId(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch notifications',
            error: error.message
        });
    }
}

exports.getCourseLimit = async (req, res) => {
    const courseId = req.params.course_id;

    try {
        // Get the course limit
        const courseLimit = await Enrollment.getCourseLimit(courseId);

        if (courseLimit === null) {
            return res.status(404).json({
                message: 'Course not found',
                result: false
            });
        }

        return res.status(200).json(courseLimit);
    } catch (error) {
        console.error('Error fetching course limit:', error);
        return res.status(500).json({
            message: 'An error occurred while fetching the course limit',
            result: false,
            error: error.message
        });
    }
};

