var db = require('../models');
var User = db.models.User;
// var Session = db.models.Session;

function index(req, res) {
	User.findAll().then(function(users){
		res.json(users);
	});
	// res.json([{
	// 	name: 'Wob',
	// 	score: -2
	// },
	// {
	// 	name: 'Squab',
	// 	score: -9000
	// }]);
}

function show(req, res) {
	User.findById(req.params.id, {
		include: Session
	})
	.then(function(user){
		if(!user) return error(res, "not found");
		res.json(user);
	});
}

function create(req, res) {
	User.create(req.body).then(function(user){
		if(!user) return error(res, "not saved");
		res.json(user);
	});
}

function update(req, res) {
	User.findById(req.params.id)
	.then(function(user){
		if(!user) return error(res, "not found");
		return user.updateAttributes(req.body);
	})
	.then(function(user){
		res.json(user);
	});
}

function destroy(req, res){
	User.findById(req.params.id)
	.then(function(user){
		if(!user) return error(res, "not found");
		return user.destroy();
	})
	.then(function(){
		res.redirect("/users");
	});
}

module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;