'use strict';

const config = require('config');
const app = require('../../app');
const server = require('http').createServer(app);

require('./dbConnection');

module.exports = {
    _siteInstance: null,
    run: function () {
        return new Promise((resolve, reject) => {
            if (!this._siteInstance) {
                this._siteInstance = server.listen(config.port, (err, res) => {
                    resolve();
                });
            } else {
                return resolve();
            }
        })
    }
};