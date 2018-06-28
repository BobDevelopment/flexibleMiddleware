'use strict';

const express = require('express');
const router = express.Router();
const Controller = require('./controller');

//get list of customer
router.get('/resources', Controller.resources);


module.exports = router;