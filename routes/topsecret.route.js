'use strict';
const express = require('express');
const router = express.Router({ mergeParams: true });

const topSecretController = require('../controllers/topsecret.controller');

/* POST Data Satellites */
router.route('/').post(topSecretController.decryptMessageAndCoordinatesBySatelliteGroup);

module.exports = router;