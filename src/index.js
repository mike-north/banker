'use strict';

const app =             require('koa')();
const RouteRecognizer = require('route-recognizer');
var router =          new RouteRecognizer();

const validateConfig =  require('./utils/validate-config');
const redis =           require('./utils/redis');

// Routes
const serveApp =        require('./routes/serve-app');
const api =             require('./routes/api');

const port = process.env.PORT || 3000;

const configErrors = validateConfig.environment();
if (configErrors.length > 0) {
  process.stderr.write('\nConfiguration errors detected. Shutting down.\n');
}

router.add([
  {path: '/api',            handler: api.base},
]);

router.add([
  {path: '/api/apps',      handler: api.apps},
]);

router.add([
  {path: '/api/apps/:id',      handler: api.app},
]);

router.add([
  {path: '/api/apps/:id/versions',  handler: api.versions},
]);


router.add([{path: '/', handler: serveApp}]);
router.add([{path: '/*path', handler: serveApp}]);


app.use(function* (next) {
  let result = router.recognize(this.path);
  console.log(`\tGET ${this.path}\t${result.length}`)
  if (!result || result.length === 0) {
    yield next;
  } else {
    yield result[0].handler(result[0].params);
  }
});

app.listen(port);

