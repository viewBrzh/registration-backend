const Course = require('../models/course');

exports.getAllCourses = (req, res, next) => {
    Course.findAll().then(courses => {
        res.status(200).json({
            "message": "success",
            "data": courses
        });
    }).catch(error => {
        res.status(500).json({
            "message": error
        });
    });
}

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

exports.getEditCourse = (req, res, next) => {
    const courseId = req.params.courseId;
    Course.findById(courseId).then((course) => {
        res.status(200).json({
            "message": "success",
            "data": course
        });
    }).catch((error) => {
        res.status(500).json({
            "message": error
        });
    });
}

exports.editCourse = (req, res, next) => {
    const courseId = req.params.courseId;
    const { course_detail_name, train_detail, train_place, start_date, finish_date } = req.body;
    
    Course.update(courseId, course_detail_name, train_detail, train_place, start_date, finish_date).then(() => {
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
