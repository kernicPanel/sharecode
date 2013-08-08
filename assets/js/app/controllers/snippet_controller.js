Sharecode.SnippetController = Ember.ObjectController.extend({
  isEditing: false,

  editSnippet: function () {
    this.set('isEditing', true);
  },

  removeSnippet: function () {
    var snippet = this.get('model');

    snippet.deleteRecord();
    snippet.get('store').commit();
  },
  save: function () {
    var snippet = this.get('model');
    Ember.run.once(this, function () {
      snippet.get('store').commit();
    });
  }
});
