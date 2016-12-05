'use strict';

const express = require('express');
const mime = require('mime');
const router = express.Router();
const models = require('../models');
const Waka = models.Waka;
module.exports = router;

router.get('/', function(req, res, next) {
	Waka.findAll({})
	.then(waka => res.json(waka))
	.catch(next);
});