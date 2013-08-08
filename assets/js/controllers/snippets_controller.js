Sharecode.SnippetsController = Ember.ArrayController.extend({
  createSnippet: function () {
    // Get the snippet name set by the "New Snippet" text field
    var name = this.get('newTitle');
    if (!name.trim()) {
      return;
    }

    // Create the new Snippet model
    Sharecode.Snippet.createRecord({
      name: name,
      isCompleted: false
    });

    // Clear the "New Snippet" text field
    this.set('newTitle', '');

    // Save the new model
    this.get('store').commit();
  },

  clearCompleted: function () {
    var completed = this.filterProperty('isCompleted', true);
    completed.invoke('deleteRecord');

    this.get('store').commit();
  },

  remaining: function () {
    return this.filterProperty('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  remainingFormatted: function () {
    var remaining = this.get('remaining'),
    plural = remaining === 1 ? 'item' : 'items';
    return '<strong>%@</strong> %@ left'.fmt(remaining, plural);
  }.property('remaining'),

  completed: function () {
    return this.filterProperty('isCompleted', true).get('length');
  }.property('@each.isCompleted'),

  hasCompleted: function () {
    return this.get('completed') > 0;
  }.property('completed'),

  allAreDone: function (key, value) {
    if (value !== undefined) {
      this.setEach('isCompleted', value);
      return value;
    } else {
      return !!this.get('length') &&
        this.everyProperty('isCompleted', true);
    }
  }.property('@each.isCompleted')
});
