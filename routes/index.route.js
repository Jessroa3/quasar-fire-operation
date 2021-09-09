'use strict';
const express = require('express');
const router = express.Router();

const topsecret = require('./topsecret.route');
const topsecret_split = require('./topsecret_split.route');


router.use('/topsecret', topsecret);
router.use('/topsecret_split', topsecret_split);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expresssss' });
});

  // All other routes should redirect to the error.html
router.get('/*',(req, res) => {
  res.render('error', { message: '404 Not found', error:{status: 404, stack: 'Not found'} });
});


module.exports = router;
