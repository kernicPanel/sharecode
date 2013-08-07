/*global Snippets DS */
'use strict';

Sharecode.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.RESTAdapter'
});

DS.RESTAdapter.reopen({
  namespace: 'api'
});
/*
 *Sharecode.LSAdapter = DS.LSAdapter.extend({
 *  namespace: 'sharecode-emberjs'
 *});
 */
