'use strict';

const express = require('express');
const router = express.Router();
const Controller = require('./controller');

//get list of countries
router.get('/countries', Controller.list);

module.exports = router;