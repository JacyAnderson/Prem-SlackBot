// Require models to access database
var db = require('../models');

// Define User connection to database
var Session = db.models.Session;

// Index controller gets all sessions from database
function index(req, res) {
    Session.findAll().then(function(sessions){
        res.json(sessions);
    });
}

// Show controller gets one session by id from database
function show(req, res) {
    Session.findById(req.params.id)
    .then(function(session){
        if(!session) return error(res, "not found");
        res.json(session);
    });
}

// Export controllers to module exports 
module.exports.index = index;
module.exports.show = show;

