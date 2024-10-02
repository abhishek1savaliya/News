const Article = require('../models/articleModel');
const redisClient = require('../config/redis'); // Import Redis client
const elasticClient = require('../config/elasticsearch');
const kafkaClient = require('../config/kafka');
const Topic = require('../models/TopicModel');
// const { startConsumer } = require('../utils/kafka');

const getCachedArticle = async (articleId) => {
  const cachedArticle = await redisClient.get(`article:${articleId}`);
  if (cachedArticle) {
    return JSON.parse(cachedArticle); // Return cached article
  }
  return null;
};

// Helper function to cache article
const cacheArticle = async (articleId, article) => {
  await redisClient.set(`article:${articleId}`, JSON.stringify(article), { EX: 3600 }); // Cache for 1 hour
};

const setCache = (key, data, expiration = 3600) => {
  redisClient.set(key, JSON.stringify(data), 'EX', expiration);
};

// Helper function to get cached data from Redis
const getCache = async (key) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

exports.getAllArticles = async (req, res) => {
  try {
    const { query } = req.query;


    const cacheKey = query ? `articles:search:${query}` : 'articles:all';

    // Check if the data is already in the cache
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.status(200).json({ source: 'cache', data: cachedData });
    }

    if (query) {
      // Perform search on Elasticsearch
      const result = await elasticClient.search({
        index: 'articles',
        body: {
          query: {
            multi_match: {
              query,
              fields: ['headline', 'content'], // Updated to use 'headline'
            },
          },
        },
      });

      const hits = result.hits.hits.map(hit => hit._source);

      // Cache the search results
      setCache(cacheKey, hits);

      return res.status(200).json({ source: 'search', data: hits });

    } else {
      // Fetch all articles from MongoDB
      const articles = await Article.find();

      // Cache the list of articles
      setCache(cacheKey, articles);

      res.status(200).json({ source: 'db', data: articles });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchArticles = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Perform search using Elasticsearch with fuzzy matching
    const result = await elasticClient.search({
      index: 'articles',
      body: {
        query: {
          multi_match: {
            query,
            fields: ['headline', 'content'], // Updated to use 'headline'
            fuzziness: 'AUTO',
          },
        },
      },
    });

    const hits = result.hits.hits.map(hit => hit._source);
    return res.status(200).json(hits);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single article by ID (with caching)
exports.getArticleById = async (req, res) => {
  const { id } = req.params;

  try {

    const cachedArticle = await getCachedArticle(id);
    if (cachedArticle) {
      return res.status(200).json(cachedArticle);
    }

    const article = await Article.findById(id).populate('author').populate('topic'); // Populate author and topic
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await cacheArticle(id, article);

    res.status(200).json(article);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createArticle = async (req, res) => {
  const { headline, content, author, photos, frontPage, isActive, topic } = req.body;

  try {
    // Check if the topic exists
    let existingTopic = await Topic.findOne({ name: topic });

    if (!existingTopic) {
      existingTopic = new Topic({ name: topic });
      await existingTopic.save();
    }

    // Create the article with the existing or newly created topic
    const article = new Article({
      headline,
      content,
      author: req.user.id,
      photos,
      frontPage,
      isActive,
      topic: existingTopic._id, // Reference the topic's ID
    });

    await article.save();

    // Index the article in Elasticsearch
    await elasticClient.index({
      index: 'articles',
      id: article._id.toString(),
      body: {
        headline: article.headline,
        content: article.content,
      },
    });

    // Optionally send message to Kafka
    // await kafkaClient.sendMessage(process.env.KAFKA_TOPIC || 'test-topic', {
    //   event: 'article_created',
    //   articleId: article._id.toString(),
    //   headline: article.headline,
    //   content: article.content,
    //   author: article.author,
    // });

    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update article (also update Elasticsearch index and send message to Kafka)
exports.updateArticle = async (req, res) => {
  const { id } = req.params;
  const { headline, content, photos, frontPage, isActive, topic } = req.body;

  try {
    const article = await Article.findByIdAndUpdate(id, { headline, content, photos, frontPage, isActive, topic }, { new: true });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Update article in Elasticsearch
    await elasticClient.update({
      index: 'articles',
      id: article._id.toString(),
      body: {
        doc: {
          headline: article.headline,
          content: article.content,
        },
      },
    });

    // Update cache with new article data
    await cacheArticle(id, article);

    // Send message to Kafka
    await kafkaClient.sendMessage(process.env.KAFKA_TOPIC || 'test-topic', {
      event: 'article_updated',
      articleId: article._id.toString(),
      headline: article.headline,
      content: article.content,
    });

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete article (also remove from Elasticsearch index and cache, send message to Kafka)
exports.deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Remove from Elasticsearch index
    await elasticClient.delete({
      index: 'articles',
      id: article._id.toString(),
    });

    // Remove from Redis cache
    await redisClient.del(`article:${id}`);

    // Send message to Kafka
    await kafkaClient.sendMessage(process.env.KAFKA_TOPIC || 'test-topic', {
      event: 'article_deleted',
      articleId: article._id.toString(),
    });

    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};