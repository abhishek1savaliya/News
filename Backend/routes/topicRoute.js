const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    createTopic,
    getTopics,
    getTopicById,
    updateTopic,
    deleteTopic
} = require('../controllers/TopicController');

const router = express.Router();

router.post('/', protect, createTopic);

// Protected route to get all topics
router.get('/', getTopics);

// Protected route to get a single topic by ID
router.get('/:id', protect, getTopicById);

// Protected route to update a topic by ID
router.put('/:id', protect, updateTopic);

// Protected route to delete a topic by ID
router.delete('/:id', protect, deleteTopic);

module.exports = router;
