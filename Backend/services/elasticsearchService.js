const elasticClient = require('../config/elasticsearch');

const searchArticles = async (query) => {
  try {
    const result = await elasticClient.search({
      index: 'articles',
      body: {
        query: {
          match: { content: query }
        }
      }
    });
    return result.hits.hits;
  } catch (error) {
    console.error('Elasticsearch search error:', error);
    throw error;
  }
};

module.exports = { searchArticles };
