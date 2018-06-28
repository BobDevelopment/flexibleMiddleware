'use strict';

const BaseController = require('./../../helpers/baseController');
const models = require("../../models");

class CountryController extends BaseController {
    constructor() {
        super();

        this.list = [
            this._list,
            this.sendResult
        ];
    }

    _list(req, res, next) {
        models.country.findAll().then(countries => {
            res.locals = countries;
            next();
        }).catch(next);
    }
}

module.exports = new CountryController();