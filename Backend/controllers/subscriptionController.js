const Subscription = require('../models/subscriptionModel');

// Subscribe to a topic (User, Guest can subscribe but must login)
exports.subscribeTopic = async (req, res) => {
  try {
    const subscription = new Subscription({ user: req.user.id, topic: req.body.topic });
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all subscriptions of a user (Authenticated users)
exports.getSubscriptions = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const subscriptions = await Subscription.find({ user: userId }).select('topic');

    const subjects = subscriptions.map(({ topic }) => topic);

    res.json({ success: true, subjects }); 
  } catch (error) {
    console.error('Error fetching subscriptions:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};


