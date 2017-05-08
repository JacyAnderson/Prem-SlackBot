// requires sequelize for javascript posgresql integration
var Sequelize = require('sequelize');

// Connect to local database
var sequelize = new Sequelize('postgres://taylorlaine@localhost:5432/prem_slackbot');

// Export sequelize to to modules
module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;

// Import models
var User = sequelize.import('./user');
var Session = sequelize.import('./session');

// establishes table relationships
Session.belongsTo(User);
User.hasMany(Session);

// Export user and session models to exports
module.exports.models = {
  User: User,
  Session: Session
};