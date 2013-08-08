/*global Snippets DS */
//'use strict';

Sharecode.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.RESTAdapter'
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
/*
 *Sharecode.LSAdapter = DS.LSAdapter.extend({
 *  namespace: 'sharecode-emberjs'
 *});
 */
