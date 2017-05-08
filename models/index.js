// Connect
var Sequelize = require('sequelize');


var sequelize = new Sequelize('postgres://JacyAanderson@localhost:5432/prem_slackbot');

// Export models 
module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;

var User = sequelize.import('./user');
// var Session = sequelize.import('./session');

// Session.belongsTo(User);
// User.hasMany(Session);

module.exports.models = {
  User: User
  // Session: Session
};