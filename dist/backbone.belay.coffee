## Backbone.Belay v0.1.0
##
## Copyright (C)2013 Will Hitchcock
## Distributed Under MIT License
##
## Documentation and Full License Available at:
## http://github.com/hitchcockwill/backbone.belay

Backbone.Belay = do (Backbone, _, jQuery) ->
  $ = jQuery
  Belay = (config) ->
    config = _.extend({}, config)

    serializer = new Serializer(config)
    # Public methods
    this.spot = (xhr, options = {}) ->
      serializer.setWatcher(xhr, options)
    this.release = (fragment = null) ->
      serializer.clearWatcher(fragment)
    this.requests = ->
      serializer.getRequests()

    this

  Serializer = (config) ->
    requests = null

    initialize = =>
      requests = {}

      # Clear all outstanding requests when a Backbone
      # route is called
      self = this
      Backbone.history.on "route", (router, fragment) ->
        self.clearWatcher(Backbone.history.fragment)

    # Remove XHR object from requests object
    # when XHR object is returned
    setXHRListener = (xhr, fragment) =>
      $.when(xhr).then =>
        @clearWatcher(fragment)

    # add a new xhr request to the request object
    # set listener to remove request when it returns
    this.setWatcher = (xhr, options = {}) ->
      if !xhr then return
      fragment = options.path || Backbone.history.fragment
      if !requests[fragment] then requests[fragment] = []

      requests[fragment].push(xhr)
      setXHRListener(xhr, fragment)

      return requests

    # - clear and abort all xhr requests in requests object
    # - passing in a fragment will clear out all
    #   requests EXCEPT requests generated from that fragment
    this.clearWatcher = (fragment) ->
      if fragment
        fragRequests = requests[fragment]
        delete requests[fragment]

      for k,v of requests
        _.each v, (r) ->
          if r.readyState isnt 4
            r.abort()
      requests = {}

      if fragment then requests[fragment] = fragRequests

      return requests

    # returns requests object
    this.getRequests = () ->
      requests

    initialize()
    this

  Belay()