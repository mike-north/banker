'use strict';

var chalk = require('chalk');

function logEnv(key, secret=false) {
  process.stdout.write(
    chalk.green(`\t${key}: \t${secret ? '*********' : process.env[key]}\n`)
  );
}


module.exports = {

  _redis: function(errors=[]) {
    if (!!process.env['REDIS_URL']) {
      logEnv('REDIS_URL', true);
    } else if (!!process.env['REDIS_HOST'] &&
               !!process.env['REDIS_PORT'] &&
               !!process.env['REDIS_SECRET']) {
      logEnv('REDIS_PORT');
      logEnv('REDIS_HOST');
      logEnv('REDIS_SECRET', true);
    } else {
      errors.push('Must provide either REDIS_URL or ' +
        '{REDIS_PORT, REDIS_HOST, REDIS_SECRET}');
    }
  },

  environment: function(errors=[]) {
    this._redis(errors);
    return errors;
  },
};
