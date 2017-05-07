module.exports = function(sequelize, Sequelize) {
  var model = sequelize.define('session', {
    user_id: Sequelize.STRING, //should reference user.id
    score: Sequelize.STRING,
    key_word: Sequelize.String
  });
  return model;
}