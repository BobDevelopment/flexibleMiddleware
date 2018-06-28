'use strict';

const BaseController = require('./../../helpers/baseController');

class CustomerController extends BaseController {
    constructor() {
        super();

        this.resources = [
            this._resources.bind(this),
            this.sendResult
        ];

    }

    _resources(req, res, next) {
        Promise.all(Object.keys(req.query).map(key => {
            return this._fetchApiData(req.app, req.query[key], key);
        })).then(data => {
            res.locals = Object.assign({}, ...data);
            next();
        }).catch(next);
    }



    _fetchApiData(app, route, key) {
        return new Promise((resolve, reject) => {
            app.runMiddleware(`/${route}`, (responseCode, body) => {
                if (!responseCode || responseCode !== 200) {
                    reject({
                        status: responseCode,
                        message: body && body.message
                    });
                }
                resolve({
                    [key]: body
                });
            })
        });
    }
}

module.exports = new CustomerController();