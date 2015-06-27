'use strict';

const express =         require('express');

const validateConfig =  require('./utils/validate-config');

// Routes
const serveApp =        require('./routes/serve-app');
const api =             require('./routes/api');

const app =             express();

const port = process.env.PORT || 3000;

const configErrors = validateConfig.environment();
if (configErrors.length > 0) {
  process.stderr.write('\nConfiguration errors detected. Shutting down.\n');
}

app.use('/api/', api);
app.use('/', serveApp);

app.listen(port);

