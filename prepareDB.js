'use strict';

const createSchema = require('./db/schema');
const fillData = require('./db/fill');

createSchema().then(() => {
    return fillData();
}).catch(error => {
    console.error(error.message);
});