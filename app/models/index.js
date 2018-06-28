'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

let db = {};

db.init = function(database) {
    db.database = database;
    fs.readdirSync('./app/models/').filter(function (file) {
        return file !== 'index.js';
    }).forEach(modelFile => {
        let model = require(path.join(__dirname, modelFile))(database, Sequelize.DataTypes);
        db[model.name] = model;
    });
};

module.exports = db;