/* jshint strict: true */
/*global Codeshare */
/*global Ember */

//(function () {
 'use strict';

 Codeshare.SnippetController = Ember.ObjectController.extend({
   isEditing: false,

   editSnippet: function () {
     this.set('isEditing', true);
   },

   removeSnippet: function () {
     var snippet = this.get('model');

     snippet.deleteRecord();
     snippet.get('store').commit();
   }
 });
//}());
