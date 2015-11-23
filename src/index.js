'use strict';

const BankerServer = require('banker-asl/server');
const RedisDataSource = require('banker-asl/datasource/redis');

let server = new BankerServer({
  datasource: new RedisDataSource({
    url: process.env.REDIS_URL || 'redis://h:pbtgp888ugmc2g4v5nsm63802f5@ec2-54-83-207-141.compute-1.amazonaws.com:22879',
    apps: {
      levanto: {
        respondTo: [/^levanto-ui.herokuapps.com/, /^.*/],
      },
    },
  }),
});

server.listen(3000 || process.env.PORT);
