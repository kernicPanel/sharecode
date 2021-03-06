Sharecode.Snippet = DS.Model.extend({
  name: DS.attr('string'),
  language: DS.attr('string'),
  body: DS.attr('string'),
  tags: DS.hasMany('Sharecode.Tag'),
  tagsNames: function(key, value){
    if (arguments.length === 1) {
      return this.get('tags').getEach('id');
    }
    else {
      var tagsIds = value.split(",");
      var tags = this.get('tags');
      tags.set('content', []);

      tagsIds.forEach(function(tagId){
        Sharecode.Tag.find(tagId).then(function(tag) {
          if (tag.get('name') === null) {
            tag = Sharecode.Tag.createRecord({
              name: tagId
            });
            Ember.run.once(this, function () {
              var savedTag = tag.save().then(function(){
                Sharecode.Tag.find({name:tagId}).then(function(newTag) {
                  tags.pushObjects(newTag);
                });
              });
            });
          }
          else {
            tags.pushObject(tag);
          }
        });
      });

      return value;
    }
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

DS.RESTAdapter.map(Sharecode.Snippet, {
  tags: { embedded: 'always' },
});

Sharecode.Tag = DS.Model.extend({
  name: DS.attr('string'),
  snippet: DS.hasMany('Sharecode.Snippet')
});


Sharecode.Snippet.FIXTURES = [
  { id: 1, name: 'Trek', language: 'Glowacki',
    body: 'test data',
    tags: [1, 2]
  },
  { id: 2, name: 'Tom' , language: 'Dale',
    body: 'test data 2',
    tags: [3]
  },
];

Sharecode.Tag.FIXTURES = [
  { id: 1, name: 'tag1' },
  { id: 2, name: 'tag2' },
  { id: 3, name: 'tag3' },
  { id: 4, name: 'tag4' },
];
