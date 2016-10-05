var express = require('express'),
	logger = require('../../config/logger'),
  	router = express.Router()  

module.exports = function (app) {
  	app.use('/api', router);  

	router.route('/users')	

		.get(function (req, res) {
			logger.log("Get all users","verbose");
            res.status(200).json({msg: "GET all users"});
		})

		.post(function(req, res){
			logger.log("Create a users","verbose");
			res.status(201).json({msg: "Create a user"});
		});
}
