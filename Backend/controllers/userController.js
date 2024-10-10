const Article = require('../models/articleModel');
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

exports.like = async (req, res) => {
  try {
    const { articleId } = req.body;

    // Find the article by ID
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Find the user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let action;
    let updatedArticle;

  
    if (user.dislikedNews.includes(articleId)) {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { dislikedNews: articleId },    
        $addToSet: { likedNews: articleId }   
      });

      // Increment the like count and decrement the dislike count
      updatedArticle = await Article.findByIdAndUpdate(
        articleId,
        { $inc: { like: 1, dislike: -1 } },    // Adjust counts
        { new: true }
      );

      action = 'liked';
    }
    // If the article is in likedNews, remove it from likedNews
    else if (user.likedNews.includes(articleId)) {
      await User.findByIdAndUpdate(req.user.id, { $pull: { likedNews: articleId } });

      updatedArticle = await Article.findByIdAndUpdate(
        articleId,
        { $inc: { like: -1 } },  // Decrease the like count by 1
        { new: true }
      );

      action = 'unliked';
    }
    // If the article is neither liked nor disliked, add it to likedNews
    else {
      await User.findByIdAndUpdate(req.user.id, { $addToSet: { likedNews: articleId } });

      updatedArticle = await Article.findByIdAndUpdate(
        articleId,
        { $inc: { like: 1 } },    // Increase the like count by 1
        { new: true }
      );

      action = 'liked';
    }

    res.json({
      success: true,
      action
    });

  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

exports.dislike = async (req, res) => {
  try {
    const { articleId } = req.body;

    // Find the article by ID
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Find the user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let action;
    let updatedArticle;

    // Check if the article is in the liked or disliked arrays
    const isLiked = user.likedNews.includes(articleId);
    const isDisliked = user.dislikedNews.includes(articleId);

    if (isDisliked) {
      // If the article is already disliked, remove it from the disliked array and decrease the dislike count
      await User.findByIdAndUpdate(req.user.id, { $pull: { dislikedNews: articleId } });

      updatedArticle = await Article.findByIdAndUpdate(
        articleId,
        { $inc: { dislike: -1 } }, // Decrease the dislike count by 1
        { new: true }
      );
      action = 'undisliked';

    } else {
      // If the article is liked, remove it from the liked array
      if (isLiked) {
        await User.findByIdAndUpdate(req.user.id, { $pull: { likedNews: articleId } });

        // Decrease the like count in the article
        await Article.findByIdAndUpdate(articleId, { $inc: { like: -1 } });
      }

      // Add to dislikedNews array and increment the dislike count
      await User.findByIdAndUpdate(req.user.id, { $addToSet: { dislikedNews: articleId } });

      updatedArticle = await Article.findByIdAndUpdate(
        articleId,
        { $inc: { dislike: 1 } }, // Increase the dislike count by 1
        { new: true }
      );
      action = 'disliked';
    }
    
    res.json({
      success: true,
      action,
    });

  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'An error occurred while processing your request' });
  }
};



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