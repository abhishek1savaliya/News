const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'my-app',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

// Create a producer
const producer = kafka.producer();

// Create a consumer
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID || 'test-group' });

// Function to connect the producer
const connectProducer = async () => {
  await producer.connect();
  console.log('Kafka Producer connected');
};

// Function to connect the consumer
const connectConsumer = async () => {
  await consumer.connect();
  console.log('Kafka Consumer connected');

  // Subscribe to a topic
  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC || 'test-topic', fromBeginning: true });

  // Handle messages
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
};

const sendMessage = async (topic, message) => {
  await producer.send({
    topic,
    messages: [
      { value: JSON.stringify(message) },
    ],
  });
};

// Export the producer and consumer connect functions
module.exports = {
  connectProducer,
  connectConsumer,
  sendMessage,
  producer,
  consumer,
};
