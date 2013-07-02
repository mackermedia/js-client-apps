var app = app || {};

app.Articles = Backbone.Collection.extend({

  model: app.Article,

  url: '/articles'

});
