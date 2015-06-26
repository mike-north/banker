const redis = require('../utils/redis');

async function getApps() {
  return redis.keys('*\:current').then(data => {
    return data.map(key => {
      return {id: key.split('\:')[0]};
    });
  });
}

module.exports = {
  apps: function*() {
    let apps = yield getApps();
    this.body = JSON.stringify({apps});
    // return apps;
  },
  versions: function*() {
    console.log(  )
    this.body = 42;
    yield;
  },
};
