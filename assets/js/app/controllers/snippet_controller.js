Sharecode.SnippetController = Ember.ObjectController.extend({
  isEditing: false,

  editSnippet: function () {
    this.set('isEditing', true);
  },

  restoreSnippet: function () {
    this.set('isEditing', false);
    var snippet = this.get('model');
    Ember.run.once(this, function () {
      snippet.get('transaction').rollback();
    });
  },

  removeSnippet: function () {
    var snippet = this.get('model');

    snippet.deleteRecord();
    snippet.get('store').commit();
  },

  saveSnippet: function () {
    this.set('isEditing', false);
    var snippet = this.get('model');
    Ember.run.once(this, function () {
      snippet.get('store').commit();
    });
  }
});
