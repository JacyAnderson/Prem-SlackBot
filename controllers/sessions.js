var db = require('../models');
var Session = db.models.Session;

function index(req, res) {
	Session.findAll().then(function(sessions){
		res.json(sessions);
	});
}

function show(req, res) {
	Session.findById(req.params.id)
	.then(function(session){
		if(!session) return error(res, "not found");
		res.json(session);
	});
}

function create(req, res) {
	Session.create(req.body).then(function(session){
		if(!session) return error(res, "not saved");
		res.json(session);
	});
}

function update(req, res) {
	Session.findById(req.params.id)
	.then(function(session){
		if(!session) return error(res, "not found");
		return session.updateAttributes(req.body);
	})
	.then(function(session){
		res.json(session);
	});
}

function destroy(req, res) {
	Session.findById(req.params.id)
	.then(function(session){
		if(!session) return error(res, "not found");
		return session.destroy();
	})
	.then(function(){
		res.redirect("/sessions");
	});

}

module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;