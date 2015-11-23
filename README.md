# Banker

[![Build Status](https://travis-ci.org/mike-north/banker.svg?branch=master)](https://travis-ci.org/mike-north/banker)
[![Code Climate](https://codeclimate.com/github/mike-north/banker/badges/gpa.svg)](https://codeclimate.com/github/mike-north/banker)
[![Test Coverage](https://codeclimate.com/github/mike-north/banker/badges/coverage.svg)](https://codeclimate.com/github/mike-north/banker/coverage)
[![Dependency Status](https://david-dm.org/mike-north/banker.svg)](https://david-dm.org/mike-north/banker)
[![devDependency Status](https://david-dm.org/mike-north/banker/dev-status.svg)](https://david-dm.org/mike-north/banker#info=devDependencies)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https%3A%2F%2Fgithub.com%2Fmike-north%2Fbanker%2Ftree%2Fmaster)


Banker is an asset serving layer built for single-page apps. It's built around the [same conventions as ember-cli-deploy](https://www.npmjs.com/package/ember-cli-deploy), meaning that it expects to find various `index.html` files available in a Redis server. 

Key               | Value
------------------|----------
myapp:current     | `myapp:7fa8d0`
myapp:7fa8d0c     | `<html>...</html>`
myapp:48180ab     | `<html>...</html>`
myapp:857f81a     | `<html>...</html>`

The general idea is that you have an app that manages the data in Redis (via developer deploys, CI pipeline, etc...) and this little server keeps running, eventually making your new static assets available with zero downtime.

#### Requirements
* Node.js >= `5.0.0`
* Somewhere to deploy this app (i.e., Heroku)
* A Redis server (i.e., Heroku free Redis)

## Configuration

The primary means of configuring banker is by environment variables

### General Configuration

 Variable         | Required | Default       | Description
------------------|----------|---------------|------------------------
`APP_NAME`        | yes      |               | App name to use when looking for versions in Redis
`PORT`            | no       | `3030`        | Port to serve assets on

### Redis configuration

 Variable              | Required | Default       | Description
-----------------------|----------|---------------|------------------------
`REDIS_URL`            | yes      |               | Redis url


