const express = require('express');
const router = express.Router();
const Criteria = require('../controllers/criteria');

router.get('/get', Criteria.get);

router.post('/set/:number', Criteria.set);

module.exports = router;