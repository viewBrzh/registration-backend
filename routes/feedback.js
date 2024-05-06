const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback');

router.get('/all', feedbackController.getAll);

router.post('/add', feedbackController.addFeedback);

module.exports = router;
