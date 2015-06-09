'use strict';

var chalk = require('chalk');

var requiredEnvVars = ['REDIS_HOST', 'REDIS_PORT', 'REDIS_SECRET'];
var secretEnvVars = ['REDIS_SECRET'];

module.exports = {
  environment: function() {
    var errors = [];
    requiredEnvVars.forEach(function(v) {
      if (!process.env[v]) {
        var errorStr = 'Missing ENV variable: ' + v;
        errors.push(errorStr);
        process.stderr.write(chalk.red(errorStr + '\n'));
      } else {
        process.stdout.write(
          chalk.green(
            v + ':\t' + (secretEnvVars.indexOf(v) >= 0 ?
             '*********' :
             process.env[v]) + '\n'
          )
        );
      }
    });
    return errors;
  },
};