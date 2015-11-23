'use strict';

const assert = require('assert');
const RedisDatasource = require('../../datasource/redis');

describe('redis-datasource', function() {
  it('should complain if no url exists', function() {
    assert.ok(RedisDatasource);
    assert.throws(function() {
      new RedisDatasource({
        apps: {},
      });
    }, /Must provide a Redis url/);
  });

  it('should not complain if a url exists', function() {

    let rds = new RedisDatasource({
      apps: {},
      url: 'http://my-redis.com',
    });
    assert.ok(rds);
  });
});
