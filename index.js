'use strict';

var validateConfig = require('./src/utils/validate-config');
var express = require('express');
var app = express();
var Redis = require('ioredis');

var configErrors = validateConfig.environment();

if (configErrors.length > 0) {
  process.stderr.write('\nConfiguration errors detected. Shutting down.\n');
  process.exit();
}

var redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_SECRET,
});

console.log('Redis initialized', redis);

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(process.env.PORT || 3000);