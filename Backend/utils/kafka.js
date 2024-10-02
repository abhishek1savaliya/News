const kafkaClient = require('../config/kafka');

exports.startConsumer = async () => {
    await kafkaClient.connectConsumer();

    kafkaClient.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const msg = JSON.parse(message.value.toString());
            console.log(`Event: ${msg.event}, Article ID: ${msg.articleId}, Title: ${msg.title || ''}`);
        },
    });
};