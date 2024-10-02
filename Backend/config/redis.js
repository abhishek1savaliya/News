const redis = require('redis');

const redisClient = redis.createClient({
  password: 'CW2VErNCwjIh7vkl9xfQ9ymx6eTbYarH',
  socket: {
    host: 'redis-17515.c98.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 17515
  }
});

module.exports = redisClient;
