'use strict';

const datasourceManager = require('./datasource-manager');
const express =         require('express');

// const validateConfig =  require('./utils/validate-config');

switch (process.env.DATASOURCE) {
  case 'temp': {
    const TempDataSource = require('./datasources/temp');
    datasourceManager.registerDatasource(new TempDataSource());
    break;
  }
  default: {
    if (!process.env.DATASOURCE) {
      console.error('Must specify a DATASOURCE');
      process.exit();
    } else {
      console.error(`unsupported DATASOURCE: ${process.env.DATASOURCE}`);
      process.exit();
    }
  }
}


// Routes
const serveApp =        require('./routes/serve-app');
// const api =             require('./routes/api');

const app =             express();

const port = process.env.PORT || 3000;

// const configErrors = validateConfig.environment();
// if (configErrors.length > 0) {
//   process.stderr.write('\nConfiguration errors detected. Shutting down.\n');
// }

// app.use('/api/', api);
app.use('/', serveApp);

app.listen(port);

