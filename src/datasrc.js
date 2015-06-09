var RedisDatasrc = require('./datasrc/redis');

module.exports = function() {
  switch (process.env.BANKER_DATASRC) {
    case 'redis': {
      return new RedisDatasrc();
    }
    default: {
      throw 'Unknown datasrc';
      return null;
    }
  }
}();
