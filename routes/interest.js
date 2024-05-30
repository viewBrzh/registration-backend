const express = require('express');
const router = express.Router();
const interestController = require('../controllers/interest');

router.get('/get/:user_id', interestController.getByUser);

router.post('/add/:user_id', interestController.addUserInterest);

router.put('/update/:user_id', interestController.updateUserInterest);

module.exports = router;
