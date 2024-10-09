const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
  {
    headline: { type: String, required: true },
    photos: [
      {
        url: { type: String, required: true },
        title: { type: String },
        description: { type: String }
      }
    ],
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    frontPage: { type: Boolean },
    isActive: { type: Boolean, default: true },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true
    },
    country: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    like: {
      type: Number,
      default: 0 // Default value for likes
    },
    dislike: {
      type: Number,
      default: 0 
    },
    view: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Article', ArticleSchema);