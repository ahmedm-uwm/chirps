var express = require('express'),
	logger = require('../../config/logger'),
	router = express.Router()
	mongoose = require('mongoose'),
	Chirp = mongoose.model('Chirp');

module.exports = function (app) {
	app.use('/api', router);

	router.route('/chirps')

		//More Web Services
		.post(function (req, res, next) {
			logger.log('Create Chirp', 'verbose');
			var chirp = new Chirp(req.body);
			chirp.save()
				.then(function (result) {
					res.status(201).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
		})

		.get(function (req, res) {
			logger.log("Get all chirps", "verbose");
			res.status(200).json({ msg: "Get all chirps" });
		})

		// .post(function(req, res){
		// 	logger.log("Create a chirps","verbose");
		// 	res.status(201).json({msg: "Create a chirps"});
		// })

		.put(function (req, res) {
			logger.log("Update a chirps", "verbose");
			res.status(201).json({ msg: "Update a chirps" });
		});

	router.route('/chirps/:id')

		.get(function (req, res) {
			logger.log("Get a chirps", "verbose");
			res.status(200).json({ msg: "Get a chirps" });
		})

		.delete(function (req, res) {
			logger.log("Delete a chirps", "verbose");
			res.status(200).json({ msg: "Delete a chirps" });
		});

	router.route('/chirps/userChirps/:id')

		//More Web Services
		.get(function (req, res, next) {
			logger.log('Get User Chirps ' + req.params.id, 'verbose');
			Chirp.find({ chirpAuthor: req.params.id })
				.populate('chirpAuthor')
				.sort("-dateCreated")
				.exec()
				.then(function (chirps) {
					res.status(200).json(chirps);
				})
				.catch(function (err) {
					return next(err);
				})
		});


	// 	.get(function (req, res) {
	// 	logger.log("Get a user’s chirps", "verbose");
	// 	res.status(200).json({ msg: "Get a user’s chirps" });
	// });

	router.route('/chirps/like/:id')

		//More Web Services
		.put(function (req, res, next) {
			logger.log('Update Chirp ' + req.params.id, 'debug');
			Chirp.findOne({ _id: req.params.id }).exec()
				.then(function (chirp) {
					chirp.likes++;
					return chirp.save();
				})
				.then(function (chirp) {
					res.status(200).json(chirp);
				})
				.catch(function (err) {
					return next(err);
				});
		});


	// 	.put(function (req, res) {
	// 	logger.log("Like a chirp", "verbose");
	// 	res.status(201).json({ msg: "Like a chirp" });
	// });

}