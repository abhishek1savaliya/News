const redisClient = require('../config/redis');

const setCache = (key, value) => {
  redisClient.set(key, JSON.stringify(value), 'EX', 3600); // Cache for 1 hour
};

const getCache = (key, callback) => {
  redisClient.get(key, (err, data) => {
    if (err) return callback(err);
    callback(null, JSON.parse(data));
  });
};

module.exports = { setCache, getCache };
