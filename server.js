'use strict';

require('./db');

const config = require('config');
const app = require('./app');
const server = require('http').createServer(app);

server.setTimeout(0);
server.listen(config.port, function () {
    console.info('Starting server');
});