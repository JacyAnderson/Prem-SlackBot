var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.js');
var sessionsController = require('../controllers/sessions.js');


//User Routes

//index
router.get('/api/users', usersController.index);

//Create
router.post('/api/users', usersController.create);

//show
router.get('/api/users/:id', usersController.show);

//update
router.put('/api/users/:id', usersController.update);

//destroy
router.delete('/api/users/:id', usersController.destroy);

//Session Routes

//index
router.get('/api/sessions', sessionsController.index);

//Create
router.post('/api/sessions', sessionsController.create);

//Show
router.get('/api/sessions/:id', sessionsController.show);

//Update
router.put('/api/sessions/:id', sessionsController.update);

//Destory
router.delete('/api/sessions/:id', sessionsController.destroy);

module.exports = router;