const express = require('express');
const RSVP    = require('rsvp');

// const redis   = require('../utils/redis');

function getVersions(appId) {
  return redis.keys(`${appId}\:*`).then(data => {
    return data.map(key => {
      return {id: key};
    });
  });
}

function getApps() {
  return redis.keys('*\:current').then(data => {
    return data.map(key => key.split('\:')[0]);
  }).then(appNames => {
    let promises = appNames.map(appName => {
      return getVersions(appName).then(versions => {
        return { id: appName, versions: versions.map(v => v.id) };
      });
    });
    return RSVP.all(promises);
  });
}

const router = express.Router();
router.use((req, res, next) => {
  res.type('json');
  next();
});

router.get('/apps', (req, res) => {
  getApps().then(apps => {
    let versions = apps
      .map(a => a.versions)
      .reduce((acc, i) => acc.concat(i), [])
      .reduce(function(p, c) {
        if (p.indexOf(c) < 0) {
          p.push(c);
        }
        return p;
      }, [])
      .map(id => {
        let parts = id.split('\:');
        return { id, appId: parts[0] };
      });
    res.send(JSON.stringify({apps, versions}));
  });
});

router.get('/app/:id', (req, res) => {
  let app = {id: req.params.id};
  getVersions(req.params.id).then(versions => {
    app.versions = versions.map(v => v.id);
    versions = versions.map(v => {
      return { id: v.id, appId: app.id };
    });
    res.send(JSON.stringify({ app, versions }));
  });
});
module.exports = router;
