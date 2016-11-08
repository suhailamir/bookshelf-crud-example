var users = require('./../middleware/users-middleware');
var cache = require('express-redis-cache')({ expire: 3600 });

module.exports = function (server) {

	server.get('/users',
		 cache.route(),
	    users.getUsers,
	    (req, res, next) => {
	        res.send({
	        	status: 200,
	        	data: res.data
	        });
	    });
	server.post('/users',
	    users.saveUser,
	    (req, res, next) => {
	        res.send({
	        	status: 200,
	        	data: res.data
	        });
	    });
	server.put('/users/:id',
	    users.updateUser,
	    (req, res, next) => {
	        res.send({
	        	status: 200,
	        	data: res.data
	        });
	    });
	server.get('/users/:id',
	    users.findById,
	    (req, res, next) => {
	        res.send({
	        	status: 200,
	        	data: res.data
	        });
	    });
	server.post('/users/find',
	    users.findByEmail,
	    (req, res, next) => {
	        res.send({
	        	status: 200,
	        	data: res.data
	        });
	    });
	server.post('/users/delete/:id',
	    users.deleteUser,
	    (req, res, next) => {
	        res.send({
	        	status: 200,
	        	data: res.data
	        });
	    });

};
