const BaseDatasource = require('./base');

function TempDatasource() {

}

TempDatasource.prototype = new BaseDatasource();

TempDatasource.prototype.getIndexHtmlForKey = function(key) {
  return `<html>
  <head></head>
  <body>
    <h1>Hello! ${key}</h1>
  </body>`;
};

TempDatasource.prototype.getUrlToAppTable = function() {
  return {
    test2: {hostname: 'localhost', paths: ['pages/*path'] },
    test:  {hostname: 'localhost', paths: ['*path'] },
    test3: {hostname: 'lvh.me',    paths: ['*path'] },
  };
};

TempDatasource.prototype._name = 'temp';

module.exports = TempDatasource;
