var DB = require("../models").models;

var userCreate = function() {
  return DB.User.create({
    lastname: 'sob',
    firstname: "qquibbySwibbi",
    interacted: false
  });
};

userCreate()
.then(function(user){
  console.log(user.id);
  console.log("its wobby");
  sessionCreate(user.id)
  .then(function(){
    process.exit();
  });
});

var sessionCreate = function(id) {
  return DB.Session.create({
    score: "-5",
    key_word: 'motherdick',
    userId: id
  });
};



// sessionCreate()
// .then(function() {
//   console.log('it\'s wobby\'s shit');
//   process.exit();
// });