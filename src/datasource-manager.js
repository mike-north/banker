const RSVP = require('rsvp');

function DatasourceManager() {

}

DatasourceManager.prototype = {
  _datasource: null,

  registerDatasource(ds) {
    this._datasource = ds;
    console.log(`Registered Datasource: ${ds.name()}`);
  },

  _datasourceOp(f) {
    if (!this._datasource) {
      return RSVP.reject('No index Datasource');
    } else {
      try {
        return RSVP.resolve(f.apply(this, [this._datasource]));
      } catch (e) {
        console.error(e);
        debugger;
        return RSVP.reject(e);
      }
    }
  },

  getAppNameForUrl(hostname, path) {
    return this._datasourceOp(ds => ds.getAppNameForUrl(hostname, path));
  },

  getIndexHtmlForKey(key) {
    return this._datasourceOp(ds => ds.getIndexHtmlForKey(key));
  },

  getAllVersions() {
    return this._datasourceOp(ds => ds.getAllVersions(key));
  },

  toString() {
    return `Datasource Manager`;
  },
};

const instance = new DatasourceManager();

module.exports = instance;
