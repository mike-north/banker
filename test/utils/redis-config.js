const assert = require('assert');
const redisConfig = require('../../src/utils/redis-config');

describe('redis-config', function() {
  it('should have REDIS_URL take prescedence', function() {
    assert.equal(redisConfig({
      REDIS_URL: 'abc',
      REDIS_HOST: 'def',
      REDIS_PORT: 01412,
      REDIS_SECRET: 'secret',
    }), 'abc');
  });

  it('should allow only REDIS_URL', function() {
    assert.equal(redisConfig({
      REDIS_URL: 'abc',
    }), 'abc');
  });

  it('should require REDIS_HOST, REDIS_PORT, REDIS_SECRET ' +
      'if REDIS_URL is absent', function() {
    assert.throws(function() {
      redisConfig({
        REDIS_HOST: 'abc',
      });
    });
  });
  it('should require REDIS_HOST, REDIS_PORT, REDIS_SECRET ' +
      'if REDIS_URL is absent', function() {
    assert.deepEqual(redisConfig({
      REDIS_HOST: 'abc',
      REDIS_PORT: 3000,
      REDIS_SECRET: 'abc123',
    }), {host: 'abc', port: 3000, password: 'abc123'});
  });
});
