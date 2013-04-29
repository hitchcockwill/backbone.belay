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
    return this;
  };
  Serializer = function(config) {
    var initialize, requests, setXHRListener,
      _this = this;

    requests = null;
    initialize = function() {
      var self;

      console.log("init serializer", _this);
      requests = {};
      return self = _this;
    };
    setXHRListener = function(xhr, fragment) {
      console.log("set listener");
      return $.when(xhr).then(function() {
        console.log("request done");
        return _this.clearWatcher(fragment);
      });
    };
    this.setWatcher = function(xhr, options) {
      var fragment;

      if (!xhr) {
        return;
      }
      console.log("set watcher: ", xhr);
      fragment = Backbone.history.fragment;
      if (!requests[fragment]) {
        requests[fragment] = [];
      }
      requests[fragment].push(xhr);
      console.log("watcher set: ", requests);
      return setXHRListener(xhr, fragment);
    };
    this.clearWatcher = function(fragment) {
      var k, v;

      console.log("clear watcher from: ", fragment);
      if (fragment) {
        console.log("array before clear: ", requests[fragment]);
        requests[fragment] = _.reject(requests[fragment], function(r) {
          if (r.readyState === 4) {
            r.abort();
          }
          console.log("readyState: ", r.readyState, r.readyState === 4);
          return r.readyState === 4;
        });
        return console.log("array after clear: ", requests[fragment]);
      } else {
        for (k in requests) {
          v = requests[k];
          _.each(v, function(r) {
            return r.abort();
          });
        }
        return requests = {};
      }
    };
    initialize();
    return this;
  };
  return Belay();
})(Backbone, _, jQuery);
