'use strict';

const CoreObject = require('core-object');
const koa = require('koa');
const assert = require('assert');
const chalk = require('chalk');

module.exports = CoreObject.extend({
  init(config) {

    assert(!!config.datasource, 'Banker Server - Must provide a datasource');
    this.datasource = config.datasource;
    this.app = koa();
    this.app.use(function*(next) {
      const start = new Date();
      yield next;
      const ms = new Date() - start;
      this.set('X-Response-Time', ms + 'ms');
    });
    this.app.use(function*(next) {
      const start = new Date();
      yield next;
      const ms = new Date() - start;
      console.log([
        chalk.green(this.method),
        chalk.green(this.url),
        chalk.white(ms + 'ms'),
      ].join(' '));
    });
    const datasource = this.datasource;

    this.app.use(function*(/*next*/) {
      yield datasource.getResponseForRequest(this.request).then(dsResponse => {
        this.set('X-App-Version-Requested', `${dsResponse.requestedVersion}`);
        this.set('X-App-Version-Served', `${dsResponse.resolvedVersion}`);
        this.body = dsResponse.html;
      }).catch((err) => {
        if (err === 'Force HTTPS') {
          let newURL = 'https://' + this.request.host;
          console.log(`Force HTTPS - redirecting to URL: ${newURL}`);
          this.redirect(newURL);
          this.response.status = 302;
          return;
        } else {
          console.error('ERROR', err, err.stack);
          if (err.status && err.status === 404) {
            this.response.status = 404;
            this.body = `404 - ${err.message}`;
          } else {
            this.response.status = 500;
            this.body = `500 - Internal Server Error\n${err}`;
          }
        }
      });
    });
  },
  listen(port) {
    console.log(`Listening on port: ${port}`);
    this.app.listen(port);
  },
});
