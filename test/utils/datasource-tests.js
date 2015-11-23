'use strict';

const assert = require('assert');
const Datasource = require('../../src/datasource/base');
const RSVP = require('rsvp');

describe('datasource', function() {
  it('should complain if no apps object exists', function() {
    assert.ok(Datasource);
    assert.throws(function() {
      new Datasource();
    }, /an "apps" configuration object/);
  });

  it('should get the correct app name for a request' +
    ' on the root of a hostname', function() {
    let ds = new Datasource({
      apps: {
        myapp: {
          respondTo: [/^lvh.me/],
        },
      },
    });

    return ds.getAppNameForRequest({host: 'lvh.me', url: '/'}).then(name => {
      assert.equal(name, 'myapp');
    });
  });

  it('should get the correct app name for a request' +
    ' for a page/hostname combination', function() {
    let ds = new Datasource({
      apps: {
        myapp: {
          respondTo: [/^lvh.me/],
        },
      },
    });

    return ds.getAppNameForRequest({
      host: 'lvh.me',
      url: '/login/abc?123',
    }).then(name => {
      assert.equal(name, 'myapp');
    });
  });

  it('should return a 404 for unknown hostnames', function(done) {
    let ds = new Datasource({
      apps: {
        myapp: {
          respondTo: [/^lvh.me/],
        },
      },
    });

    ds.getAppNameForRequest({
      host: 'unknown.example.com',
      url: '/login/abc?123',
    }).catch(e => {
      assert.equal(e.status, 404);
      assert.equal(e.message, 'App not found');
      done();
    });
  });

  it('should respect the ?version queryparam', function() {
    let ds = new Datasource({
      apps: {
        myapp: {
          respondTo: [/^lvh.me/],
        },
      },
    });

    return ds.getVersionForRequest({
      host: 'lvh.me',
      url: '/login/abc?123',
      query: {
        version: 'abc123',
      },
    }).then(ver => {
      assert.equal(ver, 'abc123');
    });
  });

  it('should default to "current" version', function() {
    let ds = new Datasource({
      apps: {
        myapp: {
          respondTo: [/^lvh.me/],
        },
      },
    });

    return ds.getVersionForRequest({
      host: 'lvh.me',
      url: '/login/abc?123',
    }).then(ver => {
      assert.equal(ver, 'current');
    });
  });

  it('should return a response for a given key', function() {
    let CustomDataSource = Datasource.extend({
      getDataForKey(key) {
        if (key === 'myapp:current') {
          return RSVP.resolve('myapp:123');
        } else if (key === 'myapp:123') {
          return RSVP.resolve('hello');
        } else {
          return RSVP.reject(`Unexpected key: ${key}`);
        }
      },
    });

    let ds = new CustomDataSource({
      apps: {
        myapp: {
          respondTo: [/^lvh.me/],
        },
      },
    });

    return ds.getResponseForRequest({
      host: 'lvh.me',
      url: '/login/abc?123',
    }).then(data => {
      assert.equal(data.requestedVersion, 'myapp:current');
      assert.equal(data.resolvedVersion, 'myapp:123');
      assert.equal(data.html, 'hello');
    });
  });
});
