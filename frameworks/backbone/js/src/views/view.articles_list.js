var app = app || {};

// The Articles List View
// ---------------
app.ArticlesListView = Backbone.View.extend({

  template: _.template( $('#articles-list-template').html() ),

  initialize: function() {
    this.collection.fetch({
      success: _.bind(function () {
        this.collection.forEach(function(model) {
          var view = new app.ArticleView({ model: model });
          $("#article-list").append(view.render().el);
        });
      }, this)
    });
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  }

});
