var app = app || {};

// The Login View
// ---------------
app.LogInView = Backbone.View.extend({

  events:{
    'click #log-in':'authenticateUser'
  },

  authenticateUser: function( e ) {
    e.preventDefault();

    var formData = {};

    formData.email = $("#email").val();
    formData.password = $("#password").val();

    var session = new app.Session( formData );
    session.save(null, {
      success: function (model, response) {
        app.AUTH_TOKEN = response.token;
        localStorage["AUTH_TOKEN"] = response.token;
        Backbone.trigger("swap:view", { "view": "articles_list" });
        Backbone.trigger("app:login");
      },
      error: function (model, response) {
        $("#error-container").html(response.responseText);
      }
    });
  },

  template: _.template( $('#log-in-template').html() ),

  render: function() {
    this.$el.html( this.template() );
    return this;
  }

});
