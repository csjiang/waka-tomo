'use strict';

const express = require('express');
const mime = require('mime');
const router = express.Router();
const models = require('../../db/models');
const Kigo = models.Kigo;
module.exports = router;

router.get('/', function(req, res, next) {
	Kigo.findAll({})
	.then(kigo => res.json(kigo))
	.catch(next);
});

// router.param('kigoId', function (req, res, next, id) { //todo: scopes
//   Kigo.scope('defaultScope', 'populated').findById(id)
//   .then(function (kigo) {
//     if (!kigo) {
//       const err = Error('Entry not found');
//       err.status = 404;
//       throw err
//     }
//     req.kigo = kigo;
//     next();
//     return null; // silences bluebird warning about promises inside of next
//   })
//   .catch(next);
// });

// router.get('/:kigoId', function (req, res) {
//   res.json(req.kigo);
// });