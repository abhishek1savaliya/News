const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const redisClient = require('./config/redis');
const elasticClient = require('./config/elasticsearch');
// const kafkaClient = require('./config/kafka');
const routes = require('./routes/index');
const MongoStore = require('connect-mongo');
// const { startConsumer } = require('./utils/kafka');

dotenv.config();

// Connect to the database
connectDB();

// Connect to Elasticsearch
elasticClient.info()
  .then(response => console.log(response.tagline))
  .catch(error => console.error(error));

// Connect to Redis
redisClient.on('connect', () => {
  console.log('Redis connected');
});

redisClient.connect().catch((err) => console.error('Redis connection error: ', err));

// Connect to Kafka
// kafkaClient.connectProducer().catch(console.error);
// kafkaClient.connectConsumer().catch(console.error);

const app = express();
app.use(express.json());
app.use(cookieParser());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Change this to a strong secret in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp', // Your MongoDB connection string
      collectionName: 'sessions',
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
