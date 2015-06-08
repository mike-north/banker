'use strict';

const chalk = require('chalk');

const requiredEnvVars = ['REDIS_HOST', 'REDIS_PORT', 'REDIS_SECRET'];
const secretEnvVars = ['REDIS_SECRET'];

module.exports = {
  environment() {
    let errors = [];
    requiredEnvVars.forEach(function(v) {
      if (!process.env[v]) {
        let errorStr = `Missing ENV variable: ${v}`;
        errors.push(errorStr);
        process.stderr.write(chalk.red(`${errorStr}\n`));
      } else {
        process.stdout.write(
          chalk.green(
            `${v}:\t${secretEnvVars.indexOf(v) >= 0 ?
             '*********' :
             process.env[v]}\n`
          )
        );
      }
    });
    return errors;
  },
};