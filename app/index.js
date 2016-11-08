require('dotenv').config();
require('./lib/database');
require('./lib/cache');
const restify = require('restify');
const server = require('./lib/server')();
require('./lib/routes')(server);

// Application wide middleware
server.use(restify.queryParser());
server.use(restify.bodyParser());


