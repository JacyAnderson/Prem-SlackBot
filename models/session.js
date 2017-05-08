// Creates session model
module.exports = function(sequelize, Sequelize) {

  var model = sequelize.define('session', {
    user_id: Sequelize.STRING, //should reference user.id
    session_id: Sequelize.STRING,
    score: Sequelize.STRING,
    key_word: Sequelize.STRING,
    response: Sequelize.STRING
  });

  return model;  
};