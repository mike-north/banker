const redis = require('../utils/redis');

async function getVersions(appId) {
  return redis.keys(`${appId}\:*`).then(data => {
    return data.map(key => {
      return {id: key.split('\:')[1]};
    })
  });
}


async function getApps() {
  return redis.keys('*\:current').then(data => {
    return data.map(key => {
      let appName = key.split('\:')[0];
      let versions = getVersions();
      return {id: appName, versions};
    });
  });
}


module.exports = {

  base: function(params) {
    return function*() {
      this.body = {};
    }
  },

  app: function(params) {
    return function*() {
      let versions = yield getVersions(params.id);
      this.body = {
        app: {
          id: params.id,
          versions: versions
        }
      };
    };
  },

  apps: function*(params) {
    let apps = yield getApps();
    this.body = { apps };
  },

  versions: function(params) {
    return function*() {
      let versions = yield getVersions(params.id);
      this.body = { versions };
    }
  },
};
