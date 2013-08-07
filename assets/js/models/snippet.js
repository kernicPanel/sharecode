/* jshint strict: true */
/*global Sharecode */
/*global Ember */
/*global DS */

//(function () {
  'use strict';

  Sharecode.Snippet = DS.Model.extend({
    name: DS.attr('string'),
    isCompleted: DS.attr('boolean'),

    snippetDidChange: function () {
      Ember.run.once(this, function () {
        this.get('store').commit();
      });
    }.observes('isCompleted', 'name')
  });
//}());
