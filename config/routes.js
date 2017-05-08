// Requires express for routing
var express = require('express');

// Create express router
var router = express.Router();

// Require user controller
var usersController = require('../controllers/users.js');

// Require session controller
var sessionsController = require('../controllers/sessions.js');


//User Routes

//index
router.get('/api/users', usersController.index);

//show
router.get('/api/users/:id', usersController.show);

//Session Routes

//index
router.get('/api/sessions', sessionsController.index);

//Show
router.get('/api/sessions/:id', sessionsController.show);

// Export Router
module.exports = router;