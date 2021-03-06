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

router.route('/bears')
	.post(function(req, res) { // Create a bear
		var bear = new Bear();
		bear.name = req.body.name;

		bear.save(function(err) {
			consol.log(err);
			if(err)
				res.send(err);
			res.json({ message: 'Bear created!' });
		});
	})
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);
			res.json(bears);
		});
	});

// on routes that end in /bears/:bear_id
router.route('/bears/:bear_id')
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})
	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			bear.name = req.body.name;

			bear.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Bear updated!' });
			});
		});
	})
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	});

app.use('/api', router); // all of our routes will be prefixed with /api

app.listen(port); // Start the server
console.log('Magic happens on port ' + port);