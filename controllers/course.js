const Course = require('../models/course');

exports.getAllCourses = async (req, res) => {
    try {
      const courses = await Course.findAll();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({
        message: 'Failed to fetch courses',
        error: error.message
      });
    }
};

  

exports.addCourse = (req, res, next) => {
    const { course_detail_name, course_id, train_detail, train_place, start_date, finish_date } = req.body;
    
    Course.create(course_detail_name, course_id, train_detail, train_place, start_date, finish_date).then(() => {
        res.status(200).json({
            "message": "success",
            "result": true
        });
    }).catch((error) => {
        res.status(200).json({
            "message": error,
            "result": false
        });
    });
}

// exports.getEditCourse = (req, res, next) => {
//     const courseId = req.params.courseId;
//     Course.findOne({ _id: courseId })
//         .then((course) => {
//             if (!course) {
//                 return res.status(404).json({
//                     message: 'Course not found'
//                 });
//             }
//             res.status(200).json({
//                 message: 'Success',
//                 data: course
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({
//                 message: 'Internal server error',
//                 error: error.message
//             });
//         });
// };

exports.getEditCourse = (req, res, next) => {
    const courseId = req.params.courseId;
    Course.findOne(courseId).then((courses) => {
        res.json(courses[0]);
    }).catch((error) => {
        res.status(500).json({
            "message": error
        });
    });
}


exports.editCourse = (req, res, next) => {
    const courseId = req.params.courseId;
    const { course_id, course_detail_name, train_detail, train_place, start_date, finish_date } = req.body;
    
    Course.update(courseId, course_id, course_detail_name, train_detail, train_place, start_date, finish_date).then(() => {
        res.status(200).json({
            "message": "success",
            "result": true
        });
    }).catch((error) => {
        res.status(200).json({
            "message": error,
            "result": false
        });
    });
}

exports.deleteCourse = (req, res, next) => {
    const courseId = req.params.courseId;
    Course.delete(courseId).then(() => {
        res.status(200).json({
            "message": "success",
            "result": true
        });
    }).catch((error) => {
        res.status(500).json({
            "message": error,
            "result": false
        });
    });
}
