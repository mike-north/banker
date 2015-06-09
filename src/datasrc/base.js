function Datasrc() {

}
Datasrc.prototype = {
  getCurrentVersion: function() {
    throw 'Not yet implemented';
  },
  getIndexHtml: function(key) {
    if (!key) {
      return this.getCurrentVersion().then(function(currentKey) {
        return this.getVersionIndexHtml(currentKey);
      }.bind(this));
    } else {
      return this.getVersionIndexHtml(key);
    }
  },
  getVersionIndexHtml: function(/* Key */) {
    throw 'Not yet implemented';
  },
};

module.exports = Datasrc;
