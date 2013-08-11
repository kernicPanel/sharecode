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
  //valueBinding: 'tagNames',
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
      initSelection : function (element, callback) {
        var data = [];
        $(element.val().split(",")).each(function () {
          data.push({id: this, text: this});
        });
        //console.log('data', data);
        callback(data);
      },
      formatSelection: function(elem, container){
        //console.log('formatSelection', elem, container);
        return elem.text;
      }
    });
  },

  willDestroyElement: function () {
    this.$().select2("destroy");
  }
});
