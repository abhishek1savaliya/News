const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { signToken } = require('../config/jwt');

// Register a new user
exports.register = async (req, res) => {
  const { fName, lName, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a new user
    const user = new User({ fName, lName, email, password, role });
    await user.save();

    // Generate JWT token
    const token = signToken({ id: user._id, role: user.role });

    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = signToken({ id: user._id, role: user.role });

    req.session.user = { id: user._id, email: user.email, role: user.role };

    res.json({
      success: true,
      token,
      session: req.session.user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};