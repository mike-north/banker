const RouteRecognizer = require('route-recognizer');

function BaseDatasource() {

}

BaseDatasource.prototype = {
  _name: 'NO NAME',
  _urlToAppMap: null,
  name() {
    return this._name;
  },
  _setupPathToAppMap() {
    this._urlToAppMap = {};
    let table = this.getUrlToAppTable();
    console.log('\n\nURL/PATH to APP table\n---------------------------');
    for (let k in table) {
      const {hostname, paths} = table[k];
      let router = this._urlToAppMap[hostname];
      if (!router) {
        router = new RouteRecognizer();
        this._urlToAppMap[hostname] = router;
      } else {
        debugger;
      }
      function handler() {return k;}
      const routes = paths.map(path => {
        console.log(`${hostname}  \t${path}\t\t${k}`);
        return { path, handler };
      });
      router.add(routes);
    }
  },
  getUrlToAppTable() {
    throw 'Not implemented';
  },
  getAppNameForUrl(hostname, path) {
    if (!this._urlToAppMap) {
      this._setupPathToAppMap();
    }
    const router = this._urlToAppMap[hostname];
    let routes = router.recognize(path);
    if (!routes || routes.length < 1 || !routes[0]) {
      throw `No route for ${hostname}/${path}`;
    } else {
      if (routes.length > 1) {
        debugger;
      }
      return routes[0].handler();
    }
  },
  getIndexHtmlForKey(key) {
    throw 'Not implemented';
  },
  getAllVersions() {
    throw 'Not implemented';
  },
};

module.exports = BaseDatasource;
