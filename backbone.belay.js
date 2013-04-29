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
    return this.release = function(fragment) {
      if (fragment == null) {
        fragment = null;
      }
      return serializer.clearWatcher(fragment);
    };
  };
  Serializer = function(config) {
    var initialize, requests, setXHRListener;

    requests = null;
    initialize = function() {
      return requests = {};
    };
    setXHRListener = function(xhr, fragment) {
      return $.when(xhr).then(this.clearWatcher(fragment));
    };
    this.setWatcher = function(xhr, options) {
      var fragment;

      if (!xhr) {
        return;
      }
      fragment = Backbone.history.fragment;
      if (!requests[fragment]) {
        requests[fragment] = [];
      }
      requests[fragment].push(xhr);
      return setXHRListener(xhr, fragment);
    };
    this.clearWatcher = function(fragment) {
      var k, v;

      if (fragment) {
        return requests[fragment] = _.reject(requests[fragment], function(r) {
          if (r.readyState === 4) {
            r.abort();
          }
          return r.readyState === 4;
        });
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
    return initialize();
  };
  return Belay;
})(Backbone, _, jQuery);
