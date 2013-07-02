var app = app || {};

// The Nav View
// ---------------

// Our overall **NavView** is the top-level piece of UI.
app.NavView = Backbone.View.extend({

  events: {
    'click #sign-up-link': 'triggerSignUpView',
    'click #log-in-link': 'triggerLogInView',
    'click #log-out-link': 'logOut',
    'click #account-link': 'triggerAccountView',
    'click #post-new-link': 'triggerPostNewView'
  },

  template: _.template( $('#nav-template').html() ),

  initialize: function() {
    Backbone.on("nav:login", this.loggedIn, this);
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },

  triggerSignUpView: function(e) {
    e.preventDefault();

    Backbone.trigger("swap:view", { "view": "sign_up" });
    $("#sign-up-link").hide();
    $("#log-in-link").show();
  },

  triggerLogInView: function(e) {
    e.preventDefault();

    Backbone.trigger("swap:view", { "view": "log_in" });
    $("#sign-up-link").show();
    $("#log-in-link").hide();
  },

  triggerAccountView: function(e) {
    e.preventDefault();

    Backbone.trigger("swap:view", { "view": "account_show" });
  },

  triggerPostNewView: function(e) {
    e.preventDefault();

    Backbone.trigger("swap:view", { "view": "post_new" });
  },

  logOut: function(e) {
    e.preventDefault();

    var session = new app.Session();
    session.id = 'id';
    session.destroy({
      success: _.bind(function (model, response) {
        app.AUTH_TOKEN = null;
        localStorage["AUTH_TOKEN"] = null;
        Backbone.trigger("swap:view", { "view": "articles_list" });
        this.loggedOut();
      }, this)
    });
  },

  loggedIn: function(account) {
    $("#sign-up-link").hide();
    $("#log-in-link").hide();
    $("nav").append("<a href='#' id='post-new-link'>New Post</a>");
    $("nav").append(this.accountLink(account.get("username")));
    $("nav").append("<a href='#' id='log-out-link'>Log Out</a>");
  },

  loggedOut: function() {
    $("#sign-up-link").show();
    $("#log-in-link").show();
    $("#post-new-link").remove();
    $("#log-out-link").remove();
    $("#account-link").remove();
  },

  accountLink: function(username) {
    return "<a href='#' id='account-link'>" + username + "</a>";
  }

});
