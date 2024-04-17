const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const db = require('../util/database');

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(201).json({ message: 'User registered successfully' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Get user from database
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else if (result.length === 0) {
        res.status(401).json({ message: 'Invalid credentials' });
      } else {
        // Compare passwords
        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};