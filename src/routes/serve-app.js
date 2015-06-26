const redis = require('../utils/redis');

async function tryGetVersion(key) {
  return redis.get(key).then(data => {

    if(/[a-zA-Z]+\:[abcdef0-9]+/.test(data)) {
      let parts = data.split('\:');
      return tryGetVersion(`${parts[0]}:${parts[1]}`);
    }
    else {
      return data;
    }
    return data;
  });
};


module.exports = function *(){
  // Serve
  this.type = 'text/html; charset=utf-8';
  let indexkey = process.env.APP_NAME + `:${(this.request.query.index_key || 'current')}`;
  let version = yield tryGetVersion(indexkey);
  this.body = version;
};
