(function(moduleGlobal) {
  var Neder = function() {
    this.thenCallback = function() {};
    this.data = null;
    this.resolved = false;
    this.nextPromise = null;
  }

  Neder.prototype.getNextPromise = function() {
    this.nextPromise = this.nextPromise || new Neder();
    return this.nextPromise;
  };

  /**
   * callback(data, nextCall)
   */
  Neder.prototype.then = function(callback) {
    this.thenCallback = callback;
    if (this.resolved) this.callThen();

    return this.getNextPromise();
  };

  Neder.prototype.resolve = function(error, data) {
    this.data = data;
    this.resolved = true;
    this.callThen();
  };

  Neder.prototype.callThen = function() {
    var nextPromise = this.getNextPromise();
    return this.thenCallback(this.data, nextPromise.resolve.bind(nextPromise));
  };

  Neder.amen = function(callback) {
    var promise = new Neder();
    promise.resolve(null);
      return promise.then(function(nothing, next) {
          return callback(next);
      }.bind(this));
  };

  if (typeof(require) === 'function' && module) {
    module.exports = Neder;
  } else {
    moduleGlobal.Neder = Neder;
  }
})(typeof(window) === 'undefined' ? global : window);
