'use strict';

const BaseController = require('./../../helpers/baseController');
const models = require("../../models");

class UserController extends BaseController {
    constructor() {
        super();

        this.list = [
            this._list,
            this.sendResult
        ];

        this.getOne = [
            this._getOne,
            this.sendResult
        ];
    }

    _list(req, res, next) {
        models.user.findAll().then(users => {
            res.locals = users;
            next();
        }).catch(next);
    }

    _getOne(req, res, next) {
        models.user.findById(req.params.userId).then(user => {
            if (!user) {
                return next({
                    status: 404,
                    message: 'User not found'
                });
            }
            res.locals = user;
            next();
        }).catch(next);
    }
}

module.exports = new UserController();

