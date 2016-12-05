'use strict';

const express = require('express');
const mime = require('mime');
const router = express.Router();
const models = require('../models');
const Kigo = models.Kigo;
module.exports = router;

router.get('/', function(req, res, next) {
	Kigo.findAll({})
	.then(kigo => res.json(kigo))
	.catch(next);
});