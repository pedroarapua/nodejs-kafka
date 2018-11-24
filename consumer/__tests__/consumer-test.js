'use scrict';

const Kafka = require('node-rdkafka');

test('createReadStream Kafka Consumer', () => {
  const spy = jest.spyOn(Kafka.Consumer, 'createReadStream');
  const isCreateReadStream = Kafka.Consumer.createReadStream();

  expect(spy).toHaveBeenCalled();
  expect(isCreateReadStream).toBe(true);

  spy.mockRestore();
});