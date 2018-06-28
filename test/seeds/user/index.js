'use strict';

const data = require('./data.json');
const models = require('../../../app/models/index');


class User {

    static fillDb() {
        return models.user.bulkCreate(data);
    }

    static get data() {
        return data;
    }

}

module.exports = User;