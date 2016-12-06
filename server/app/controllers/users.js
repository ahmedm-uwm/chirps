var express = require('express'),
	logger = require('../../config/logger'),
	router = express.Router()
mongoose = require('mongoose')
User = mongoose.model('User')
passportService = require('../../config/passport')
passport = require('passport')
var requireAuth = passport.authenticate('jwt', { session: false });
var requireLogin = passport.authenticate('local', { session: false });


router.route('/users/login').post(requireLogin, login);



module.exports = function (app) {
	app.use('/api', router);

	router.route('/users')

		.get(requireAuth, function (req, res, next) {
			logger.log('Get User', 'verbose');
			var query = User.find()
				.sort(req.query.order)
				.exec()
				.then(function (result) {
					res.status(200).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
		})


		//		.get(function (req, res) {
		//			logger.log("Get all users", "verbose");
		//			res.status(200).json({ msg: "GET all users" });
		//		})

		.post(function (req, res, next) {
			logger.log('Create User', 'verbose');
			var user = new User(req.body);
			user.save()
				.then(function (result) {
					res.status(201).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
		})

		//		.post(function (req, res) {
		//			logger.log("Create a users", "verbose");
		//			res.status(201).json({ msg: "Create a user" });
		//		})

		.put(requireAuth, function (req, res, next) {
			logger.log('Update User ' + req.params.id, 'verbose');
			var query = User.findOneAndUpdate(
				{ _id: req.body._id },
				req.body,
				{ new: true })
				.exec()
				.then(function (result) {
					res.status(200).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
		})

	//		.put(function (req, res) {
	//		logger.log("Update a users", "verbose");
	//		res.status(201).json({ msg: "Update a user" });
	//	});

	router.route('/users/:id')

		.get(requireAuth, function (req, res, next) {
			logger.log('Get User ' + req.params.id, 'verbose');
			var query = User.findById(req.params.id)
				.exec()
				.then(function (result) {
					res.status(200).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
		})

		.get(requireAuth, function (req, res) {
			logger.log("Get a users", "verbose");
			res.status(200).json({ msg: "GET a user" });
		})

		.put(requireAuth, function (req, res, next) {
			logger.log('Update User ' + req.params.id, 'verbose');
			var query = User.findById(req.params.id)
				.exec()
				.then(function (user) {
					var query = User.findById(req.params.id)
						.exec()
						.then(function (user) {
							if (req.body.firstName !== undefined) {
								user.firstName = req.body.firstName;
							};
							if (req.body.lastName !== undefined) {
								user.lastName = req.body.lastName;
							};
							if (req.body.screenName !== undefined) {
								user.screenName = req.body.screenName;
							};
							if (req.body.email !== undefined) {
								user.email = req.body.email;
							};
							if (req.body.password !== undefined) {
								user.password = req.body.password;
							};

							return user.save();
						})
						.then(function (user) {
							res.status(200).json(user);
						})
						.catch(function (err) {
							return next(err);
						});
				})
		})

		.delete(requireAuth, function (req, res, next) {
			logger.log('Delete User ' + req.params.id, 'verbose');
			var query = User.remove({ _id: req.params.id })
				.exec()
				.then(function (result) {
					res.status(204).json({ message: 'Record deleted' });
				})
				.catch(function (err) {
					return next(err);
				});
		})

	// .delete(function (req, res) {
	// 	logger.log("Delete a user", "verbose");
	// 	res.status(200).json({ msg: "Delete a user" });
	// });

	router.route('/users/screenName/:name')

		//More Web Services
		.get(requireAuth, function (req, res, next) {
			logger.log('Get User ' + req.params.id, 'verbose');
			User.findOne({ screenName: req.params.name }).exec()
				.then(function (user) {
					res.status(200).json(user);
				})
				.catch(function (err) {
					return next(err);
				});
		});


	// 	.get(function (req, res) {
	// 	logger.log("Get a user based on screen name", "verbose");
	// 	res.status(200).json({ msg: "Get a user based on screen name" });
	// });

	router.route('/users/followedChirps/:id')

		//More Web Services

		.get(requireAuth, function (req, res, next) {
			logger.log('Get Users followed chirps ' + req.params.id, 'debug');
			User.findOne({ _id: req.params.id }, function (err, user) {
				if (!err) {
					Chirp.find({
						$or: [
							{ user: user._id }, { user: { $in: user.follow } }
						]
					}).populate('chirpAuthor').sort({ dateSubmitted: -1 }).exec(function (err, chirps) {
						if (!err) {
							res.status(200).json(chirps);
						} else {
							res.status(403).json({ message: "Forbidden" });
						}
					});
				}
			});
		});

	// .get(requireAuth, function (req, res, next) {
	// 	logger.log('Get Users followed chirps ' + req.params.id, 'verbose');
	// 	User.findOne({ _id: req.params.id })
	// 		.then(function (user) {
	// 			Chirp.find({ $or: [{ chirpAuthor: user._id }, { chirpAuthor: { $in: user.follow } }] })
	// 				.populate('screenName')
	// 				.sort('-dateCreated')
	// 				.exec()
	// 				.then(function (chirps) {
	// 					res.status(200).json(chirps);
	// 				})
	// 		})
	// 		.catch(function (err) {
	// 			return next(error);
	// 		});
	// });


	// 	.get(function (req, res) {
	// 	logger.log("Get the chirps of the users a user follows", "verbose");
	// 	res.status(200).json({ msg: "Get the chirps of the users a user follows" });
	// });

	router.route('/users/follow/:id')

		//More Web Services
		.put(requireAuth, function (req, res, next) {
			logger.log('Update User ' + req.params.id, 'verbose');
			User.findOne({ _id: req.params.id }).exec()
				.then(function (user) {
					if (user.follow.indexOf(req.body._id) == -1) {
						user.follow.push(req.body._id);
						user.save()
							.then(function (user) {
								res.status(200).json(user);
							})
							.catch(function (err) {
								return next(error);
							});
					}
				})
				.catch(function (err) {
					return next(err);
				});
		});



	// .put(function (req, res) {
	// 	logger.log("Follow a user", "verbose");
	// 	res.status(201).json({ msg: "Follow a user" });
	// });
}
