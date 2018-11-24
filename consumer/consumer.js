'use strict';

const Kafka = require('node-rdkafka');
const config = require('config');
const { createHierarchy } = require('../utilities');
let hierarchy = {};

// Read from the librdtesting-01 topic... note that this creates a new stream on each call!
const stream = Kafka.Consumer.createReadStream({
  'group.id': 'kafka',
  'metadata.broker.list': (config.kafka.hosts || []).join(',')
}, {}, {
  topics: ['test']
});

stream.on('data', function(message) {
  console.log('Got message');
  console.log(message.value.toString());
  hierarchy = createHierarchy(hierarchy, JSON.parse(message.value.toString()), 'parentId');
  console.log(JSON.stringify(hierarchy, null, 2));  
});
