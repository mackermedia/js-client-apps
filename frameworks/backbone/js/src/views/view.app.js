var app = app || {};

// The Application
// ---------------

// Our overall **AppView** is the top-level piece of UI.
app.AppView = Backbone.View.extend({

  // Instead of generating a new element, bind to the existing skeleton of
  // the App already present in the HTML.
  el: '#hackernews-app',

  initialize: function() {
    this.renderNavView();
    this.renderArticlesList();

    Backbone.on("swap:view", this.swapView, this);
    Backbone.on("app:login", this.fetchAccount, this);

    if (localStorage["AUTH_TOKEN"] != "null") {
      app.AUTH_TOKEN = localStorage["AUTH_TOKEN"];
      this.fetchAccount();
    }
  },

  renderNavView: function() {
    var view = new app.NavView();
    this.$el.append( view.render().el );
  },

  renderArticlesList: function() {
    var view = new app.ArticlesListView({ collection: new app.Articles });
    $("#main").html( view.render().el );
  },

  swapView: function(arg) {
    var view = null;

    switch(arg.view) {
      case "sign_up":
        view = new app.SignUpView();
        break;
      case "log_in":
        view = new app.LogInView();
        break;
      case "articles_list":
        view = new app.ArticlesListView({ collection: new app.Articles });
        break;
      case "account_show":
        view = new app.AccountShowView({ model: app.current_account});
        break;
      case "account_edit":
        view = new app.AccountEditView({ model: app.current_account});
        break;
      case "post_new":
        view = new app.PostNewView({ model: new app.Article });
        break;
    }

    $("#main").html( view.render().el );
  },

  fetchAccount: function() {
    var account = new app.Account;
    account.fetch({
      success: function(){
        Backbone.trigger("nav:login", account);
      }
    });
    app.current_account = account;
  }

});
