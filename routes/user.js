const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/departments', userController.getAllDepartments)

// Login user
router.post('/login', userController.loginUser);

// Get all users
router.get('/all', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

router.put('/update/:id', userController.updateUser);

router.post('/userCount', userController.getUserCount);

router.get('/getDepartment/:id', userController.getUserDepartment);



module.exports = router;
