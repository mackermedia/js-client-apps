var app = app || {};

// The Nav View
// ---------------

// Our overall **NavView** is the top-level piece of UI.
app.SignUpView = Backbone.View.extend({

  events:{
    'click #sign-up':'saveUser'
  },

  saveUser: function( e ) {
    e.preventDefault();

    var formData = {};

    formData.email = $("#email").val();
    formData.username = $("#username").val();
    formData.password = $("#password").val();
    formData.password_confirmation = $("#password-conf").val();

    var user = new app.User( formData );
    user.save(null, {
      success: function (model, response) {
        Backbone.trigger("swap:view", { "view": "log_in" })
      },
      error: function (model, response) {
        $("#error-container").html(response.responseText);
      }
    });
  },

  template: _.template( $('#sign-up-template').html() ),

  render: function() {
    this.$el.html( this.template() );
    return this;
  }

});
