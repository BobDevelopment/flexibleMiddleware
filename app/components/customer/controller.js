'use strict';

const BaseController = require('./../../helpers/baseController');
const models = require("../../models");

class CustomerController extends BaseController {
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
        models.customer.findAll().then(customers => {
            res.locals = customers;
            next();
        }).catch(next);
    }

    _getOne(req, res, next) {
        models.customer.findById(req.params.customerId).then(customer => {
            if (!customer) {
                return next({
                    status: 404,
                    message: 'Customer not found'
                });
            }
            res.locals = customer;
            next();
        }).catch(next);
    }
}

module.exports = new CustomerController();