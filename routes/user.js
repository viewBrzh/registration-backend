const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Login user
router.post('/login', userController.loginUser);

// Get all users
router.get('/all', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

module.exports = router;
