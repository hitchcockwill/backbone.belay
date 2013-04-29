Backbone.Belay = do (Backbone, _, jQuery) ->
  $ = jQuery
  Belay = (config) ->
    config = _.extend({}, config)

    serializer = new Serializer(config)

    this.spot = (xhr, options = {}) ->
      serializer.setWatcher(xhr, options)

    this.release = (fragment = null) ->
      serializer.clearWatcher(fragment)

  Serializer = (config) ->
    requests = null

    initialize = ->
      requests = {}

    setXHRListener = (xhr, fragment) ->
      $.when(xhr).then(@clearWatcher(fragment))

    this.setWatcher = (xhr, options) ->
      if !xhr then return
      fragment = Backbone.history.fragment
      if !requests[fragment] then requests[fragment] = []
      requests[fragment].push(xhr)
      setXHRListener(xhr, fragment)

    this.clearWatcher = (fragment) ->
      if fragment
        requests[fragment] = _.reject requests[fragment], (r) ->
          if r.readyState is 4 then r.abort()
          return r.readyState is 4
      else
        for k,v of requests
          _.each v, (r) ->
            r.abort()
        requests = {}

    initialize()

  Belay