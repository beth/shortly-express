var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  constructor: function() {
    db.Model.call(this, arguments[0]);
  },

  initialize: function(params){
    console.log('PARAMS');
    console.log(params);
    this.on('creating', function(model, attrs, options){
      var hash = bcrypt.hashSync(params.tempPassword);
      model.set('password', hash);
    });
  }
});

module.exports = User;
