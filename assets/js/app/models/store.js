Sharecode.Store = DS.Store.extend({
  revision: 12,
  //adapter: 'DS.RESTAdapter'
  adapter: DS.FixtureAdapter.create()
});

DS.RESTAdapter.reopen({
  namespace: 'api',
  serializer: DS.RESTSerializer.extend({
    primaryKey: function(type) {
      return '_id';
    },
    serializeId: function(id) {
      return id.toString();
    }
  })
});
