const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { signToken } = require('../config/jwt');

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = new User({ username, password, role });
    await user.save();

    const token = signToken({ id: user._id, role: user.role });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = signToken({ id: user._id, role: user.role });

    // Store user information in session
    req.session.user = { id: user._id, username: user.username, role: user.role };

    res.json({
      success: true,
      token: token,
      session: req.session.user, // Optional: include session info in response
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout function to destroy the session
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};
