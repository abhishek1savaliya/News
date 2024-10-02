const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const articleRoutes = require('./articleRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');
const topicRoutes = require('./topicRoute')

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/articles', articleRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/topics', topicRoutes)

module.exports = router;
