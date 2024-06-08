const Feedback = require('../models/feedback');

exports.getAll = async (req, res) => {
    try {
        const feedbacks = await Feedback.getAll();
        res.status(200).json(feedbacks);
      } catch (error) {
        res.status(500).json({
          message: 'Failed to fetch feedbacks',
          error: error.message
        });
      }
}

exports.addFeedback = async (req, res) => {
    const { rating, comment, date, enroll_id } = req.body;
    try {
        const result = await Feedback.addFeedback(rating, comment, date, enroll_id);
        res.status(200).json({
            message: 'Feedback added successfully',
            feedback_id: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add feedback',
            error: error.message
        });
    }
}

exports.getFeedBackByCourse = async (req, res) => {
    const courseId = req.params.course_id;
    try {
        const result = await Feedback.getFeedbackByCourse(courseId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get feedback',
            error: error.message
        });
    }
}