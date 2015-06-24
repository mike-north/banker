'use strict';

var validateConfig = require('./utils/validate-config');
var koa = require('koa');
var app = koa();
var Redis = require('ioredis');

var configErrors = validateConfig.environment();

if (configErrors.length > 0) {
  process.stderr.write('\nConfiguration errors detected. Shutting down.\n');
  process.exit();
}

var redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_SECRET,
});

async function tryGetVersion(appName, appVersion) {
	return redis.get(`${appName}:${appVersion}`).then(data => {

		if(/[a-zA-Z]+\:[abcdef0-9]+/.test(data)) {
			let parts = data.split('\:');
			return tryGetVersion(parts[0], parts[1]);
		}
		else {
			return data;
		}
		console.log(data);
		return data;
	});
};

app.use(function *(){
	// Serve
	this.type = 'text/html; charset=utf-8';
	let indexkey = process.env.APP_NAME + `:${(this.request.query.index_key || 'current')}`;
	let version = yield tryGetVersion(indexkey);
	this.body = version;
});

app.listen(process.env.PORT || 3000);

