const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  photos: [
    {
      url: { type: String, required: true },  // URL or path to the photo
      title: { type: String, required: true }, // Title of the photo
      description: { type: String, required: true } // Description of the photo
    }
  ],
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Article', ArticleSchema);
