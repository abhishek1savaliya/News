const { producer } = require('../config/kafka');

const publishMessage = (topic, message) => {
  const payloads = [{ topic, messages: message }];
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Error publishing message to Kafka:', err);
    } else {
      console.log('Message published to Kafka:', data);
    }
  });
};

module.exports = { publishMessage };