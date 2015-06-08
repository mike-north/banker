'use strict';

const validateConfig = require('./src/utils/validate-config');
const koa = require('koa');
const app = koa();
const Redis = require('ioredis');

const configErrors = validateConfig.environment();

if (configErrors.length > 0) {
  process.stderr.write('\nConfiguration errors detected. Shutting down.\n');
  process.exit();
}

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_SECRET,
});

console.log('Redis initialized', redis);

app.use(function* () {
  this.body = 'hello world';
  yield 1;
});

app.listen(process.env.PORT || 3000);