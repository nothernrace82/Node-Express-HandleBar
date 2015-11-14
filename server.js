var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); 

var Bear = require('./app/models/bear');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();


// middleware to use for all requests
router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'abc' });
});

app.use('/api', router); // all of our routes will be prefixed with /api

app.listen(port); // Start the server
console.log('Magic happens on port ' + port);