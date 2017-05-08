// Require models to connect to database
var DB = require("../models");

// Set up tables and clear any data in them
DB.sequelize.sync({force: true}).then(function(){
  process.exit();
});