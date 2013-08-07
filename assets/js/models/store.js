/*global Snippets DS */
'use strict';

Codeshare.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.RESTAdapter'
});

DS.RESTAdapter.reopen({
  namespace: 'api'
});
/*
 *Codeshare.LSAdapter = DS.LSAdapter.extend({
 *  namespace: 'codeshare-emberjs'
 *});
 */
