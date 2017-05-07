module.exports = function(sequelize, Sequelize) {
  var model = sequelize.define('user', {
    name: Sequelize.STRING,
    interacted: {type: Sequelize.BOOLEAN, allowNull: false, default: false}
  });
};