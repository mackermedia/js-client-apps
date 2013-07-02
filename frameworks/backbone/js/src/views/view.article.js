var app = app || {};

// Individual Article View
// ---------------
app.ArticleView = Backbone.View.extend({

  initialize: function() {
    console.log("article init");
  },

  template: _.template( $('#article-template').html() ),

  render: function() {
    this.$el.html( this.template() );
    return this;
  }

});
