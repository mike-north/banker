const express = require('express');

const redis = require('../utils/redis');


const router = express.Router();

function tryGetVersion(key) {
  return redis.get(key).then(data => {

    if (/[a-zA-Z]+\:[abcdef0-9]+/.test(data)) {
      let parts = data.split('\:');
      return tryGetVersion(`${parts[0]}:${parts[1]}`);
    } else {
      return data;
    }
    return data;
  });
}



router.get('/', (req, res) => {
  let indexkey =
    `${process.env.APP_NAME}:${(req.query['index_key'] || 'current')}`;
  tryGetVersion(indexkey).then(data => {
    res.send(data);
  });
});

module.exports = router;
