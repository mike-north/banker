const Redis =           require('ioredis');
const redisConfig =     require('./redis-config');

const redis = new Redis(redisConfig(process.env));

module.exports = redis;
