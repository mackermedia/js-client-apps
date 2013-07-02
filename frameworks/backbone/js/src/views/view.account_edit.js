var app = app || {};

// The Account Edit View
// ---------------
app.AccountEditView = Backbone.View.extend({

  events:{
    'click #submit':'updateAccount'
  },

  updateAccount: function(e) {
    e.preventDefault();

    var formData = {};

    this.model.set("email", $("#email").val());
    this.model.set("username", $("#username").val());

    this.model.save(null, {
      success: function (model, response) {
        Backbone.trigger("swap:view", { "view": "account_show" })
      },
      error: function (model, response) {
        $("#error-container").html(response.responseText);
      }
    });
  },

  template: _.template( $('#account-edit-template').html() ),

  render: function() {
    this.$el.html( this.template() );
    return this;
  }

});
