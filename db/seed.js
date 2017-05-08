var DB = require("../models").models;

var userCreate = function() {
  return DB.User.create({
    name: 'Wob',
    interacted: false
  });
};

var sessionCreate = function() {
  return DB.Session.create({
    
  })
}