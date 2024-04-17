const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Register a new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);


router.get('/', (req, res) => {
    res.json({ message: 'Hello from users' });
  });

module.exports = router;
