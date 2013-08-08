Sharecode.Router.map(function () {
  this.resource('snippets', { path: '/' }, function () {
    this.route('active');
    this.route('completed');
  });
});

Sharecode.SnippetsRoute = Ember.Route.extend({
  model: function () {
    return Sharecode.Snippet.find();
  }
});

Sharecode.SnippetsIndexRoute = Ember.Route.extend({
  setupController: function () {
    var snippets = Sharecode.Snippet.find();
    this.controllerFor('snippets').set('filteredSnippets', snippets);
  }
});

Sharecode.SnippetsActiveRoute = Ember.Route.extend({
  setupController: function () {
    var snippets = Sharecode.Snippet.filter(function (snippet) {
      if (!snippet.get('isCompleted')) {
        return true;
      }
    });

    this.controllerFor('snippets').set('filteredSnippets', snippets);
  }
});

Sharecode.SnippetsCompletedRoute = Ember.Route.extend({
  setupController: function () {
    var snippets = Sharecode.Snippet.filter(function (snippet) {
      if (snippet.get('isCompleted')) {
        return true;
      }
    });

    this.controllerFor('snippets').set('filteredSnippets', snippets);
  }
});
