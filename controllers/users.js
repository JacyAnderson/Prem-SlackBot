// Require models to access database
var db = require('../models');

// Define User connection to database
var User = db.models.User;

// Index controller gets all users from database
function index(req, res) {
	User.findAll().then(function(users){
		res.json(users);
	});
}

// Show controller gets one user by id from database
function show(req, res) {
	User.findById(req.params.id, {
		include: Session
	})
	.then(function(user){
		if(!user) return error(res, "not found");
		res.json(user);
	});
}

// Export controllers to module exports
module.exports.index = index;
module.exports.show = show;