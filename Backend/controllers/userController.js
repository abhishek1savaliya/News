const TopicModel = require('../models/TopicModel');
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
    const user = await User.findById(req.user.id)
      .select('-password') // Exclude password from the user object
      .populate('subscribedTopic', 'name'); // Populate subscribedTopic with topic names

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Format the user object to exclude _id from subscribedTopic
    const userProfile = {
      ...user.toObject(), // Convert Mongoose document to a plain JavaScript object
      subscribedTopic: user.subscribedTopic.map(topic => topic.name), // Only include topic names
    };

    res.json(userProfile);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};



// Update user profile (User, Employee, Admin)
exports.updateUserProfile = async (req, res) => {
  try {
    const { fName, lName, subscribedTopic } = req.body;

    const topics = await TopicModel.find({ name: { $in: subscribedTopic } });

    // Check if all topics exist
    if (topics.length !== subscribedTopic.length) {
      return res.status(400).json({ message: 'One or more topics are not valid' });
    }

    // Map the found topics to their IDs
    const topicIds = topics.map(topic => topic._id);

    const updates = {
      fName,
      lName,
      subscribedTopic: topicIds, // Save topic IDs
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password').populate('subscribedTopic', 'name');

    // If no user is found, return a 404 error
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);

  } catch (error) {
    // Return a server error if something goes wrong
    console.error(error); // Log the error for debugging
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