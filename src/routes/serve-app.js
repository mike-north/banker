const express = require('express');
const datasourceManager = require('../datasource-manager');

// const redis = require('../utils/redis');

const router = express.Router();

// function tryGetVersion(key) {
//   return redis.get(key).then(data => {

//     if (/[a-zA-Z]+\:[abcdef0-9]+/.test(data)) {
//       let parts = data.split('\:');
//       return tryGetVersion(`${parts[0]}:${parts[1]}`);
//     } else {
//       return data;
//     }
//     return data;
//   });
// }



router.get('/*', (req, res) => {
  const url = `${req.hostname}/${req.url}`;
  datasourceManager.getAppNameForUrl(req.hostname, req.url)
    .then(appName => {
      let indexkey =
        `${appName}:${(req.query['index_key'] || 'current')}`;
      datasourceManager.getIndexHtmlForKey(indexkey)
        .then(data => res.send(data))
        .catch(err => res.send(err));
    })
    .catch(err => {
      res.send(`No app for ${url}`);
    });
});

module.exports = router;
