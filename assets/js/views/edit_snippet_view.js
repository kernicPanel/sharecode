Sharecode.EditSnippetView = Ember.TextField.extend({
  classNames: ['edit'],

  valueBinding: 'snippet.name',

  change: function () {
    var value = this.get('value');

    if (Ember.isEmpty(value)) {
      this.get('controller').removeSnippet();
    }
  },

  focusOut: function () {
    this.set('controller.isEditing', false);
    this.get('controller').save();
  },

  insertNewline: function () {
    this.set('controller.isEditing', false);
  },

  didInsertElement: function () {
    this.$().focus();
  }
});
