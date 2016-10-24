var api = require('request/api.js');
var request = require('request/request.js');

App({
  onLaunch: function() {
    console.log('App onLaunch');
  },
  onShow: function() {
    console.log('App onShow');
  },
  onHide: function() {
    console.log('App onHide');
  },
  api: api,
  request: request
})
