var DB = require("../models").models;

var userCreate = function() {
  return DB.User.create({
    lastname: 'Wob',
    firstname: "SquibbySwibbi",
    interacted: false
  });
};

userCreate()
.then(function(){
  console.log("its wobby");
  process.exit();
});