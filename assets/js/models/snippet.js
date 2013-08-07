/* jshint strict: true */
/*global Codeshare */
/*global Ember */
/*global DS */

//(function () {
  'use strict';

  Codeshare.Snippet = DS.Model.extend({
    name: DS.attr('string'),
    isCompleted: DS.attr('boolean'),

    snippetDidChange: function () {
      Ember.run.once(this, function () {
        this.get('store').commit();
      });
    }.observes('isCompleted', 'name')
  });
//}());
