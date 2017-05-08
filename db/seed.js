var DB = require("../models").models;

var userCreate = function() {
  return DB.User.create({
    lastname: 'Smith',
    firstname: "John",
    interacted: false
  });
};

var sessionCreate = function(id) {
  return DB.Session.create({
    score: "-5",
    key_word: 'upset',
    userId: id
  });
};

userCreate()
.then(function(user){
  console.log(user.id);
  console.log("Saved");
  sessionCreate(user.id)
  .then(function(){
    process.exit();
  });
});
