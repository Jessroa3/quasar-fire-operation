'use strict';
const express = require('express');
const router = express.Router({ mergeParams: true });

const topSecretController = require('../controllers/topsecret.controller');

//router.route('/:satellite_name').get(topSecretController);
//router.route('/:satellite_name').post(topSecretController);

module.exports = router;