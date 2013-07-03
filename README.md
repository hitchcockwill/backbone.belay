Backbone Belay
==============

A plugin for managing multiple pending server requests with Backbone.

Quick user navigation through Backbone applications can trigger a barrage of server requests that make load time painfully slow when the user finally lands on the view that they want. If HTTP requests have a callback, as they commonly do in Backbone applications, unwanted functions can be called trying to show views in undefined layouts. Backbone Belay is here to manage this problem.

##Usage##
To use Backbone Belay, simply pass your fetch request into the ```Backbone.Belay.spot()``` method. By default, each request is associated with the current Backbone.history.fragment. When the Backbone.route event is triggered on navigation, pending requests will be automatically aborted.

##Examples##
###Basic Usage###
    xhr = model.fetch();
    Backbone.Belay.spot(xhr);

###Request with error callback###
    xhr = model.fetch({
      error: function (model, response) {
        if(response.status === 0) return
        else
          ...other code here...
      }      
    });

###Cancelling a request###
    Backbone.Belay.release("route/");

###Define a custom path to store the request###
    xhr = model.fetch();
    Backbone.Belay.spot(xhr, {path: "custom/path/"});