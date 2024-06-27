const User = require('../models/user');

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, email, phone, image } = req.body;
  User.update(userId, username, email, phone, image).then(() => {
    res.status(200).json({
      "message": "success",
      "result": true
    });
  }).catch((error) => {
    res.status(400).json({
      "message": error,
      "result": false
    });
  });
};

exports.getUserDepartment = async (req, res) => {
  const userId = req.params.id;
  try {
    const department = await User.getDepartmentByUserId(userId);
    res.status(200).json( department[0] );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllDepartments = async (req, res) => {
  const faculty = req.params.faculty;
  const departments = await User.getAllDepartments(faculty);
  res.status(200).json(departments); // Return the entire departments array
 
};

exports.getAllFaculties = async (req, res) => {
  const faculties = await User.getAllFaculties();
  res.status(200).json(faculties[0]); // Return the entire departments array
 
};

exports.getUserCount = async (req, res) => {
  try {
    console.log('getUserCount route accessed');
    const count = await User.getCount();
    console.log('User count:', count);
    res.json({ userCount: count });
  } catch (error) {
    console.error('Error getting user count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserStatus = async (req, res) => {
  const id = req.params.id;
  let year = req.params.year;
  year = year - 543;
  try {
    const status = await User.getUserStatus(id, year);
    res.json(status);
  } catch (error) {
    throw error;
  }
}
