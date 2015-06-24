# Banker

[![Build Status](https://travis-ci.org/truenorth/banker.svg?branch=master)](https://travis-ci.org/truenorth/banker)
[![Code Climate](https://codeclimate.com/github/truenorth/banker/badges/gpa.svg)](https://codeclimate.com/github/truenorth/banker)
[![Test Coverage](https://codeclimate.com/github/truenorth/banker/badges/coverage.svg)](https://codeclimate.com/github/truenorth/banker/coverage)
[![Dependency Status](https://david-dm.org/truenorth/banker.svg)](https://david-dm.org/truenorth/banker)
[![devDependency Status](https://david-dm.org/truenorth/banker/dev-status.svg)](https://david-dm.org/truenorth/banker#info=devDependencies)

## Configuration

The primary means of configuring banker is by environment variables

### General Configuration

 Variable         | Required | Default       | Description
------------------|----------|---------------|------------------------
`PORT`            | no       | `3030`        | Port to serve assets on

### Redis configuration

 Variable              | Required | Default       | Description
-----------------------|----------|---------------|------------------------
`REDIS_HOST`           | yes      |               | Redis hostname
`REDIS_PORT`           | yes      |               | Redis port
`REDIS_SECRET`         | yes      |               | Redis secret
`REDIS_URL`            | yes      |               | Redis url

*note*: It's required that you either provide a value for `REDIS_URL` or values for the other three parameters
