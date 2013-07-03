# Backbone Belay

A plugin for managing multiple pending server requests with Backbone.

Quick user navigation through Backbone applications can trigger a barrage of server requests that make load time painfully slow when the user finally lands on the view that they want. If HTTP requests have a callback, as they commonly do in Backbone applications, unwanted functions can be called trying to show views in undefined layouts. Backbone Belay is here to manage this problem.

## Usage
To use Backbone Belay, simply pass your fetch request into the ```Backbone.Belay.spot()``` method. By default, each request is associated with the current Backbone.history.fragment. When the Backbone.route event is triggered on navigation, pending requests will be automatically aborted.

## Examples
### Basic Usage
    xhr = model.fetch();
    Backbone.Belay.spot(xhr);

### Request with error callback
    xhr = model.fetch({
      error: function (model, response) {
        if(response.status === 0) return
        else
          ...other code here...
      }      
    });

### Cancelling a request
    Backbone.Belay.release("route/");

### Define a custom path to store the request
    xhr = model.fetch();
    Backbone.Belay.spot(xhr, {path: "custom/path/"});


# Release Notes
## v0.1.0
Initial release


# License (MIT)
Copyright (c) 2013 Will Hitchcock

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.