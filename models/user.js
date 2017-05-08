// Creates user model
module.exports = function(sequelize, Sequelize) {

  var model = sequelize.define('user', {
    lastname: Sequelize.STRING,
    firstname: Sequelize.STRING,
    interacted: {type: Sequelize.BOOLEAN, allowNull: false, default: false}
  });

  return model;
};