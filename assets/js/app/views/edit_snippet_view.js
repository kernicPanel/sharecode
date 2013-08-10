Sharecode.EditSnippetView = Ember.TextField.extend({
  classNames: ['edit'],

  valueBinding: 'snippet.name',

  change: function () {
    var value = this.get('value');

    if (Ember.isEmpty(value)) {
      this.get('controller').removeSnippet();
    }
  },

  focusOut: function () {
    //this.set('controller.isEditing', false);
    //this.get('controller').saveSnippet();
  },

  insertNewline: function () {
    console.log('insertNewLine');
    this.set('controller.isEditing', false);
  },

  didInsertElement: function () {
    this.$().focus();
  }
});

Sharecode.Select2SelectView = Ember.TextField.extend({
  valueBinding: 'snippet.tagNames',
  //value: 'tagNames',
  prompt: 'Please select...',
  classNames: ['input-xlarge'],

  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
  },

  processChildElements: function() {
    var snippet = this.get('snippet');
    var tags = Sharecode.Tag.find();
    var tagsArray = [];
    tags.forEach(function(tag){
      //console.log('tag', tag);
      tagsArray.push({
        id: tag.get('id'),
        text: tag.get('name'),
      });
    });
    test = tagsArray;
    this.$().select2({
      containerCss: {width: 200},
      placeholder: 'Tags',
      minimumInputLength: 0,
      tags: tagsArray,
      formatSelection: function(elem, container){
        console.log('formatSelection', elem, container);
        return elem.text;
      }
    })
    .on('change', function(e){
      console.log('e', e, this);
      console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
      //$(this).val(e.val.join(','));
      //push tag object to nippet object
      var newTag = Sharecode.Tag.find(e.val);
      //var snippet = this.get('snippet');
      var tags = snippet.get('tags');
      tags.pushObject(newTag);
      console.log('tags', tags.getEach('name'));

    });
  },

  willDestroyElement: function () {
    this.$().select2("destroy");
  }
});
