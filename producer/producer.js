'use strict';

const Kafka = require('node-rdkafka');
const config = require('config');

// Our producer with its Kafka brokers
// This call returns a new writable stream to our topic 'topic-name'
const stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': config.kafka.hosts
}, {}, {
  topic: config.kafka.producer.topic
});

// Writes a message to the stream
const queuedSuccess = stream.write(Buffer.from(JSON.stringify({ id: 1, name: 'FIFA' })));
stream.write(Buffer.from(JSON.stringify({ id: 2, name: 'CONMEBOL', parentId: 1 })));
stream.write(Buffer.from(JSON.stringify({ id: 3, name: 'CBF', parentId: 2 })));
stream.write(Buffer.from(JSON.stringify({ id: 4, name: 'CPF', parentId: 3 })));
stream.write(Buffer.from(JSON.stringify({ id: 5, name: 'São Paulo', parentId: 4 })));
stream.write(Buffer.from(JSON.stringify({ id: 6, name: 'Corinthians', parentId: 4 })));

if (queuedSuccess) {
  console.log('We queued our message!');
} else {
  // Note that this only tells us if the stream's queue is full,
  // it does NOT tell us if the message got to Kafka!  See below...
  console.log('Too many messages in our queue already');
}

stream.on('error', function (err) {
  // Here's where we'll know if something went wrong sending to Kafka
  console.error('Error in our kafka stream');
  console.error(err);
});
