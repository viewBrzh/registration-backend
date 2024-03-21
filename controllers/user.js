const User = require('../models/user');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if username is already taken
      const existingUser = await User.findOne({ username: username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Create a new user
      await User.create({ username: username, email: email, password: password });
  
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Login user
exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find user by username
      const [results, fields] = await User.findOne(username);
      const user = results[0];
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
