var app = app || {};

// The New Post View
// ---------------
app.PostNewView = Backbone.View.extend({

  events:{
    'click #submit':'submitPost'
  },

  submitPost: function( e ) {
    e.preventDefault();

    this.model.set("title", $("#title").val());
    this.model.set("url", $("#url").val());

    this.model.save(null, {
      success: function (model, response) {
        Backbone.trigger("swap:view", { "view": "articles_list" });
      },
      error: function (model, response) {
        $("#error-container").html(response.responseText);
      }
    });
  },

  template: _.template( $('#post-new-template').html() ),

  render: function() {
    this.$el.html( this.template() );
    return this;
  }

});
