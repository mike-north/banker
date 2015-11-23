'use strict';
const BankerServer = require('./server');
const RedisDataSource = require('./datasource/redis');

const chalk = require('chalk');
const packageJson = require('../package.json');

console.log(chalk.green(`----------------------------------------
Banker Asset Serving Layer v${packageJson.version}
----------------------------------------`));

let server = new BankerServer({
  datasource: new RedisDataSource({
    url: process.env.REDIS_URL,
  }),
});
server.listen(process.env.PORT || 3000);
