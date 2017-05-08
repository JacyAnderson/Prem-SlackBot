// Require express
var express = require('express');

// Instantiate express as app
var app = express();

// Require routes
var botRoutes = require('./config/routes.js');

var PORT  = process.env.PORT || 3000;

// Require body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Set app to use routes 
app.use(botRoutes);

// Set app to serve public directory
app.use(express.static(__dirname + '/public'));

// Start up server
app.listen(PORT, function () {
  console.log("Listening on port: " + PORT );
});