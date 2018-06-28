'use strict';

require('../db');
const models = require('../app/models/index');

let createSchema = () => {
    return models.database.sync({
        force: true
    }).then(() => {
        console.log('DB schema successfully updated');
    }).catch(error => {
        console.error(`Error occurred: ${error.message}`);
        throw error;
    });
};
module.exports = createSchema;