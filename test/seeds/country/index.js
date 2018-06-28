'use strict';

const data = require('./data.json');
const models = require('../../../app/models/index');


class Country {

    static fillDb() {
        return models.country.bulkCreate(data);
    }

    static get data() {
        return data;
    }

}

module.exports = Country;