const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { subscribeTopic, getSubscriptions } = require('../controllers/subscriptionController');

const router = express.Router();

// Protected route (User and Guest can subscribe, but login required)
router.post('/subscribe', protect, subscribeTopic);
router.get('/', protect, getSubscriptions);

module.exports = router;
