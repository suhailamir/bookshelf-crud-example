const restify = require('restify');
const debug = require('debug');

const log = debug('App:Server');
const error = debug('App:ERROR:Server');

const serverConfig = {
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
};

module.exports = createServer;

function createServer() {
    const server = restify.createServer(serverConfig);

    server
        .on('error', onError)
        .on('listening', onListening)
        .use(restify.queryParser())
        .use(restify.bodyParser())
        .listen(process.env.PORT);

    return server;
}

// -------------------------------------

function onError(err) {
    error(err);

    throw new Error(err);
}

function onListening() {
    log(`Listening on port ${process.env.PORT}`);
}

