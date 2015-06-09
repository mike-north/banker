'use strict';

var validateConfig = require('./src/utils/validate-config');
var express = require('express');
var app = express();
var datasrc = require('./src/datasrc');

var configErrors = validateConfig.environment();

if (configErrors.length > 0) {
  process.stderr.write('\nConfiguration errors detected. Shutting down.\n');
  process.exit();
}

app.get('*', function(req, res) {
  datasrc.getIndexHtml().then(function(data) {
    res.send(data);
  });
});

app.listen(process.env.BANKER_PORT || 3030);
