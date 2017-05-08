// Require models to connect to database
var DB = require("../models").models;

// Set up test user for database
var userCreate = function() {
  return DB.User.create({
    lastname: 'Smith',
    firstname: "John",
    interacted: false
  });
};

// Set up test sesssion for data base
var sessionCreate = function(id) {
  return DB.Session.create({
    score: "-5",
    key_word: 'upset',
    userId: id
  });
};

// Create test user and session
userCreate()
.then(function(user){
  console.log(user.id);
  console.log("Saved");
  sessionCreate(user.id)
  .then(function(){
    process.exit();
  });
});
