Backbone.Belay = do (Backbone, _, jQuery) ->
  $ = jQuery
  Belay = (config) ->
    config = _.extend({}, config)

    serializer = new Serializer(config)

    this.spot = (xhr, options = {}) ->
      serializer.setWatcher(xhr, options)

    this.release = (fragment = null) ->
      serializer.clearWatcher(fragment)

    this

  Serializer = (config) ->
    requests = null

    initialize = =>
      console.log "init serializer", this
      requests = {}

      self = this
      # Backbone.history.on "route", () ->
      #   console.log "route called, clear watcher", this, self
      #   self.clearWatcher()

    setXHRListener = (xhr, fragment) =>
      console.log "set listener"
      $.when(xhr).then =>
        console.log "request done"
        @clearWatcher(fragment)

    this.setWatcher = (xhr, options) ->
      if !xhr then return
      console.log "set watcher: ", xhr
      fragment = Backbone.history.fragment
      if !requests[fragment] then requests[fragment] = []
      requests[fragment].push(xhr)
      console.log "watcher set: ", requests
      setXHRListener(xhr, fragment)

    this.clearWatcher = (fragment) ->
      console.log "clear watcher from: ", fragment
      if fragment
        console.log "array before clear: ", requests[fragment]
        _.each requests[fragment], (r) ->
          console.log "clear request: ", r
          if r.readyState isnt 4 then r.abort()
        delete requests[fragment]
        console.log "array after clear: ", requests[fragment]
      else
        for k,v of requests
          _.each v, (r) ->
            if r.readyState isnt 4 then r.abort()
        requests = {}

    initialize()
    this

  Belay()