'use strict';

const config = require('config');
const Sequelize = require('sequelize');


const dbConfig = config.get('db');
const dbCreateConnection = new Sequelize(dbConfig['connectionSettings']['dialect'], dbConfig['user'], dbConfig['password'], dbConfig['connectionSettings']);
const dbConnection = new Sequelize(dbConfig['testDb'], dbConfig['user'], dbConfig['password'], dbConfig['connectionSettings']);

const models = require('../../app/models');

models.init(dbConnection);

class DataBase {
    static create() {
        return new Promise((resolve, reject) => {

            return dbCreateConnection.query(`DROP DATABASE IF EXISTS  ${dbConfig['testDb']}`).then(() => {
                return dbCreateConnection.query(`CREATE DATABASE ${dbConfig['testDb']}`)
            }).then(() => {
                return models.database.sync({force: true});
            }).then(() => resolve()
            ).catch(error => {
                console.log(error);
                reject();
            });
        });
    }

    static fillDb(seeds){
        return seeds.fillDb();
    }
}

module.exports = DataBase;