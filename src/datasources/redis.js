const BaseDatasource = require('./base');

function RedisDatasource() {

}

RedisDatasource.prototype = new BaseDatasource();

RedisDatasource.prototype._name = 'redis';

module.exports = RedisDatasource;
