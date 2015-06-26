'use strict';

const validateConfig =  require('./utils/validate-config');
const app =             require('koa')();
const redis =           require('./utils/redis');

// Routes
const serveApp =        require('./routes/serve-app');
const api =             require('./routes/api');

const port = process.env.PORT || 3000;

const configErrors = validateConfig.environment();
if (configErrors.length > 0) {
  process.stderr.write('\nConfiguration errors detected. Shutting down.\n');
  process.exit();
}

app.use(function *(next) {
  if (/^\/api\//.test(this.path)) {
    yield next;
  }
  else {
    yield serveApp;
  }
});

app.listen(port);

