/* jshint strict: true */
/*global Codeshare */
/*global Ember */

//(function () {
  'use strict';

  Codeshare.Router.map(function () {
    this.resource('snippets', { path: '/' }, function () {
      this.route('active');
      this.route('completed');
    });
  });

  Codeshare.SnippetsRoute = Ember.Route.extend({
    model: function () {
      return Codeshare.Snippet.find();
    }
  });

  Codeshare.SnippetsIndexRoute = Ember.Route.extend({
    setupController: function () {
      var snippets = Codeshare.Snippet.find();
      this.controllerFor('snippets').set('filteredSnippets', snippets);
    }
  });

  Codeshare.SnippetsActiveRoute = Ember.Route.extend({
    setupController: function () {
      var snippets = Codeshare.Snippet.filter(function (snippet) {
        if (!snippet.get('isCompleted')) {
          return true;
        }
      });

      this.controllerFor('snippets').set('filteredSnippets', snippets);
    }
  });

  Codeshare.SnippetsCompletedRoute = Ember.Route.extend({
    setupController: function () {
      var snippets = Codeshare.Snippet.filter(function (snippet) {
        if (snippet.get('isCompleted')) {
          return true;
        }
      });

      this.controllerFor('snippets').set('filteredSnippets', snippets);
    }
  });
//}());
