'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const config = require('config');
const components = require('./app/components/');

const app = express();
require('run-middleware')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

components.getRouters().forEach(route => app.use(config.get('path'), route));

app.use((req, res, next) => {
    res.status(404).send({message:'Not found'});
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({message: error.message || 'Server Error'});
});
module.exports = app;