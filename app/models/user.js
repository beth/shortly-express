var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  constructor: function() {
    db.Model.call(this, arguments[0]);
  },

  initialize: function(){
    this.on('creating', function(model, attrs, options) {
      var hash = bcrypt.hashSync(model.get('password'));
      model.set('password', hash);
    });
  },

  checkPassword: function(inputtedPassword) {

    return bcrypt.compareSync(inputtedPassword, this.get('password'));

  }
});

module.exports = User;
