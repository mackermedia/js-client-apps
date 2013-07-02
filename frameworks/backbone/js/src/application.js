var app = app || {};

$(function() {

  // modify Backbone.sync to use auth token if it's present
  Backbone.old_sync = Backbone.sync
  Backbone.sync = function(method, model, options) {
    var new_options =  _.extend({
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Content-Type', "application/json");

          var token = app.AUTH_TOKEN;
          if (token) xhr.setRequestHeader('X-User-Token', token);
        }
    }, options)
    Backbone.old_sync(method, model, new_options);
  };

  // Kick things off by creating the **App**.
  new app.AppView();

});
