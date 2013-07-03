Backbone.Belay = (function(Backbone, _, jQuery) {
  var $, Belay, Serializer;

  $ = jQuery;
  Belay = function(config) {
    var serializer;

    config = _.extend({}, config);
    serializer = new Serializer(config);
    this.spot = function(xhr, options) {
      if (options == null) {
        options = {};
      }
      return serializer.setWatcher(xhr, options);
    };
    this.release = function(fragment) {
      if (fragment == null) {
        fragment = null;
      }
      return serializer.clearWatcher(fragment);
    };
    this.requests = function() {
      return serializer.getRequests();
    };
    return this;
  };
  Serializer = function(config) {
    var initialize, requests, setXHRListener,
      _this = this;

    requests = null;
    initialize = function() {
      var self;

      requests = {};
      self = _this;
      return Backbone.history.on("route", function(router, fragment) {
        return self.clearWatcher(Backbone.history.fragment);
      });
    };
    setXHRListener = function(xhr, fragment) {
      return $.when(xhr).then(function() {
        return _this.clearWatcher(fragment);
      });
    };
    this.setWatcher = function(xhr, options) {
      var fragment;

      if (options == null) {
        options = {};
      }
      if (!xhr) {
        return;
      }
      fragment = options.path || Backbone.history.fragment;
      if (!requests[fragment]) {
        requests[fragment] = [];
      }
      requests[fragment].push(xhr);
      setXHRListener(xhr, fragment);
      return requests;
    };
    this.clearWatcher = function(fragment) {
      var fragRequests, k, v;

      if (fragment) {
        fragRequests = requests[fragment];
        delete requests[fragment];
      }
      for (k in requests) {
        v = requests[k];
        _.each(v, function(r) {
          if (r.readyState !== 4) {
            return r.abort();
          }
        });
      }
      requests = {};
      if (fragment) {
        requests[fragment] = fragRequests;
      }
      return requests;
    };
    this.getRequests = function() {
      return requests;
    };
    initialize();
    return this;
  };
  return Belay();
})(Backbone, _, jQuery);
