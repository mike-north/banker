var Redis = require('ioredis');
var Datasrc = require('./base');

function RedisDatasrc() {
  this.__host = process.env.BANKER_REDIS_HOST;
  this.__port = process.env.BANKER_REDIS_PORT;
  this.__password = process.env.BANKER_REDIS_SECRET;
  this.__redis = null;
}

RedisDatasrc.prototype = new Datasrc();

RedisDatasrc.prototype._redis = function() {
  if (!this.__redis) {
    this.__redis = new Redis({
      host: this.__host,
      port: this.__port,
      password: this.__password,
    });
  }
  return this.__redis;
};

RedisDatasrc.prototype.getCurrentVersion = function() {
  return this._redis().get('navisocial:current');
};

RedisDatasrc.prototype.getVersionIndexHtml = function(key) {
  return this._redis().get(key);
};


module.exports = RedisDatasrc;
