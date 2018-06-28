'use strict';

const express = require('express');
const router = express.Router();
const Controller = require('./controller');

//get list of customer
router.get('/customers', Controller.list);

//get customer by id
router.get('/customers/:customerId', Controller.getOne);

module.exports = router;