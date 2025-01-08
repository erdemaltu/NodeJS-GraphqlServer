const { RedisPubSub } =require('graphql-redis-subscriptions');
const Redis = require('ioredis');
const dotenv = require('dotenv');
dotenv.config();

const options = {
  host: process.env.REDİS_HOST,
  port: process.env.REDİS_PORT,
  retryStrategy: times => {
    // reconnect after
    return Math.min(times * 50, 2000);
  }
};

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});

module.exports = pubsub;