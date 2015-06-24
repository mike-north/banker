'use strict';

module.exports = function(env) {
  if (env.REDIS_URL) {
    return env.REDIS_URL;
  } else {
    if (!(env.REDIS_HOST && env.REDIS_PORT && env.REDIS_SECRET)) {
      throw new Error('Must specify REDIS_URL or ' +
       'REDIS_HOST, REDIS_PORT and REDIS_SECRET');
    }
    return {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_SECRET,
    };
  }
};
