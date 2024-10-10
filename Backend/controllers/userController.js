const User = require('../models/userModel');

// Get all users (Admin access only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords from the response
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile (User, Employee, Admin)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile (User, Employee, Admin)
exports.updateUserProfile = async (req, res) => {
  try {
    // Get the fields to update from the request body
    const updates = {
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      subscribedTopic: req.body.subscribedTopic,  // If updating subscribed topics
      likedNews: req.body.likedNews,             // If updating liked articles
      dislikedNews: req.body.dislikedNews        // If updating disliked articles
    };

    // Find the user by ID and update the fields
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');  // Ensure password is not included in the response

    // If no user is found, return a 404 error
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the updated user object
    res.json(updatedUser);
  } catch (error) {
    // Return a server error if something goes wrong
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user (Admin access only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Change user role (Admin access only)
exports.changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};