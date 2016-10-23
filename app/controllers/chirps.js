var express = require('express'),
	logger = require('../../config/logger'),
  	router = express.Router()  

module.exports = function (app) {
  	app.use('/api', router);  

	router.route('/chirps')

	.get(function (req, res) {
			logger.log("Get all chirps","verbose");
            res.status(200).json({msg: "Get all chirps"});
		})

		.post(function(req, res){
			logger.log("Create a chirps","verbose");
			res.status(201).json({msg: "Create a chirps"});
		})

		.put(function(req, res){
			logger.log("Update a chirps","verbose");
			res.status(201).json({msg: "Update a chirps"});
		});

		router.route('/chirps/:id')	

		.get(function (req, res) {
			logger.log("Get a chirps","verbose");
            res.status(200).json({msg: "Get a chirps"});
		})

		.delete(function (req, res) {
			logger.log("Delete a chirps","verbose");
            res.status(200).json({msg: "Delete a chirps"});
		});

		router.route('/chirps/userChirps/:id')	
		
		.get(function (req, res) {
			logger.log("Get a user’s chirps","verbose");
            res.status(200).json({msg: "Get a user’s chirps"});
		});

		router.route('/chirps/like/:id')	
		
		.put(function(req, res){
			logger.log("Like a chirp","verbose");
			res.status(201).json({msg: "Like a chirp"});
		});

}
