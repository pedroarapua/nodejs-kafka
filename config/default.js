'use strict';
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  kafka: {
    hosts: process.env['KAFKA_HOSTS'] || '',
    consumer: {
      topics: process.env['KAFKA_CONSUMER_TOPICS'] || ''
    },
    producer: {
      topic: process.env['KAFKA_PRODUCER_TOPIC'] || ''
    }
  }
};
