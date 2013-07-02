var app = app || {};

// The Account Show View
// ---------------
app.AccountShowView = Backbone.View.extend({

  events:{
    'click #edit':'triggerAccountEditView'
  },

  triggerAccountEditView: function() {
    Backbone.trigger('swap:view', { 'view' : 'account_edit' });
  },

  template: _.template( $('#account-show-template').html() ),

  render: function() {
    this.$el.html( this.template() );
    return this;
  }

});
