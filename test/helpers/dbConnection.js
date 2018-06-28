'use strict';

const config = require('config');
const Sequelize = require('sequelize');

const models = require('../../app/models');

const dbConfig = config.get('db');
const dbConnection = new Sequelize(dbConfig['testDb'], dbConfig['user'], dbConfig['password'], dbConfig['connectionSettings']);

models.init(dbConnection);