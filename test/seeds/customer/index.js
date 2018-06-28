'use strict';

const data = require('./data.json');
const models = require('../../../app/models/index');


class Customer {

    static fillDb() {
        return models.customer.bulkCreate(data);
    }

    static get data() {
        return data;
    }

}

module.exports = Customer;