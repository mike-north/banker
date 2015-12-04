'use strict';

const CoreObject = require('core-object');
const RSVP = require('rsvp');
const chalk = require('chalk');
const assert = require('assert');

const VERSION_DESCRIPTOR_REGEX = /^([^\s^:<>]+)\:([0-9a-f]+)/g;
const MAX_VERSION_DEPTH = 10;

module.exports = CoreObject.extend({
  init(args) {
    this._super(...arguments);
    this.apps = (args || {}).apps;
    if (process.env.APP_NAME) {
      this.apps = this.apps || {};
      this.apps[process.env.APP_NAME] = {
        respondTo: [/.*/],
      };
    } else {
      assert(this.apps, 'Must either provide an "APP_NAME" environment' +
        ' variable or an "apps" configuration object');
    }

    this._buildRegexToAppMap();
  },

  _buildRegexToAppMap() {
    console.log(chalk.blue('Setting up apps...'));
    this._regexToApp = [];
    for (let app in this.apps) {
      console.log(chalk.green(`  ${app}`));
      for (let i = 0; i < (this.apps[app].respondTo || []).length; i++) {
        console.log(chalk.green(`    ${this.apps[app].respondTo[i]}`));
        this._regexToApp.push({regex: this.apps[app].respondTo[i], app});
      }
    }
    console.log(chalk.green('----------------------------------------'));
  },

  getAppNameForRequest(request) {
    const fullUrl = request.host + request.url;
    for (let r in this._regexToApp) {
      console.log(fullUrl);
      if (this._regexToApp[r].regex.test(fullUrl)) {
        return RSVP.resolve(this._regexToApp[r].app);
      }
    }
    return RSVP.reject({status: 404, message: 'App not found'});
  },

  getVersionForRequest(request) {
    let specifiedVersion = (request.query || {}).version || 'current';
    return RSVP.resolve(specifiedVersion);
  },

  _getKeyForRequest(request) {
    return RSVP.all([
      this.getAppNameForRequest(request),
      this.getVersionForRequest(request),
    ]).then(arr => arr.join(':'));
  },

  getDataForKey(/*key, request*/) {
    RSVP.resolve('<h1>Not yet Implemented</h1>');
  },

  _getResponseForKey(key, request, depth) {
    request.__versionKeys = request.__versionKeys || [];
    request.__versionKeys.push(key);
    depth = depth || 0;
    if (depth > MAX_VERSION_DEPTH) {
      throw `Version reference chain is too deep` +
      ` (${request.__versionKeys.join(' --> ')})`;
    }
    return this.getDataForKey(key).then((data) => {
      if (VERSION_DESCRIPTOR_REGEX.test(data)) {
        return this._getResponseForKey(data, request, depth + 1);
      } else {
        if (!data) {
          throw {status: 404, message: `App version not found ${key}`};
        }
        return {html: data,  resolvedVersion: key};
      }
    });
  },

  getResponseForRequest(request) {
    return this._getKeyForRequest(request).then((key) => {
      let appName = key.split(':')[0];
      if (request.protocol !== 'https' && this.apps[appName].forceHttps) {
        throw 'Force HTTPS';
      }
      return this._getResponseForKey(key, request).then(resp => {
        resp.requestedVersion = key;
        return resp;
      });
    });
  },
});
