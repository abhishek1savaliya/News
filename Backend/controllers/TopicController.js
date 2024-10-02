const Topic = require('../models/TopicModel'); 

exports.createTopic = async (req, res) => {
    const { name, description } = req.body;

    try {
        const newTopic = new Topic({ name, description });
        await newTopic.save();
        return res.status(201).json(newTopic);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Get all topics
exports.getTopics = async (req, res) => {
    try {
        const topics = await Topic.find();
        return res.status(200).json(topics);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get a single topic by ID
exports.getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        return res.status(200).json(topic);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update a topic by ID
exports.updateTopic = async (req, res) => {
    const { name, description } = req.body;

    try {
        const updatedTopic = await Topic.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedTopic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        return res.status(200).json(updatedTopic);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Delete a topic by ID
exports.deleteTopic = async (req, res) => {
    try {
        const deletedTopic = await Topic.findByIdAndDelete(req.params.id);

        if (!deletedTopic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        return res.status(204).json(); // No content
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
