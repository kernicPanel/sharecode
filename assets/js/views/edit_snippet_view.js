/* jshint strict: true */
/*global Codeshare */
/*global Ember */
/*global DS */

//(function () {
  'use strict';

  Codeshare.EditSnippetView = Ember.TextField.extend({
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
    },

    insertNewline: function () {
      this.set('controller.isEditing', false);
    },

    didInsertElement: function () {
      this.$().focus();
    }
  });
//}());
