// auth.js
const express = require('express');
const passport = require('../passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Route for user login
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  // If authentication is successful, generate a JWT token
  const token = jwt.sign({ id: req.user._id }, 'your-secret-key', { expiresIn: '1h' });
  res.json({ token });
});

// Route for user registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

module.exports = router;
