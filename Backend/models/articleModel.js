const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  photos: [
    {
      url: { type: String, required: true },
      title: { type: String },
      description: { type: String}
    }
  ],
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  frontPage: { type: Boolean }, 
  isActive: { type: Boolean, default: true },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic', // References the Topic model
    required: true
  },
  like: {
    type: Number,
    default: 0 // Default value for likes
  },
  dislike: {
    type: Number,
    default: 0 // Default value for dislikes
  },
  view: {
    type: Number,
    default: 0 // Default value for views
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', ArticleSchema);
