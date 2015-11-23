'use strict';

const Base = require('./base');
const assert = require('assert');
const redis = require('redis');
const wrapper = require('co-redis');

module.exports = Base.extend({
  init(config) {
    this._super(...arguments);
    assert(config.url, 'Must provide a Redis url');
    this.url = config.url;
    this.redisClient = wrapper(redis.createClient(this.url));
  },

  getDataForKey(key) {
    return this.redisClient.get(key);
  },
});
