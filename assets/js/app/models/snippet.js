Sharecode.Snippet = DS.Model.extend({
  name: DS.attr('string'),
  language: DS.attr('string'),
  body: DS.attr('string'),
  isCompleted: DS.attr('boolean'),

  /*
   *snippetDidChange: function () {
   *  Ember.run.once(this, function () {
   *    this.get('store').commit();
   *  });
   *}.observes('isCompleted', 'name')
   */

});
