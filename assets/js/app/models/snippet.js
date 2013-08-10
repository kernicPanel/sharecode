Sharecode.Snippet = DS.Model.extend({
  name: DS.attr('string'),
  language: DS.attr('string'),
  body: DS.attr('string'),
  tags: DS.hasMany('Sharecode.Tag'),
  tagsNames: function(){
    return tags.getEach('name');
  }.property('tags'),
  isCompleted: DS.attr('boolean'),

  /*
   *snippetDidChange: function () {
   *  Ember.run.once(this, function () {
   *    this.get('store').commit();
   *  });
   *}.observes('isCompleted', 'name')
   */

});
