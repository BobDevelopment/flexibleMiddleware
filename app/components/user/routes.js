'use strict';

const express = require('express');
const router = express.Router();
const Controller = require('./controller');

//get list of user
router.get('/users', Controller.list);

//get user by id
router.get('/users/:userId', Controller.getOne);

module.exports = router;