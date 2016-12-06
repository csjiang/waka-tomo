'use strict';

const express = require('express');
const mime = require('mime');
const router = express.Router();
const models = require('../../db/models');
const Waka = models.Waka;
module.exports = router;

router.get('/', function(req, res, next) {
	Waka.findAll({})
	.then(waka => res.json(waka))
	.catch(next);
});

// router.param('wakaId', function (req, res, next, id) {
//   Waka.scope('defaultScope', 'populated').findById(id)
//   .then(function (waka) {
//     if (!waka) {
//       const err = Error('Entry not found');
//       err.status = 404;
//       throw err
//     }
//     req.waka = waka;
//     next();
//     return null; // silences bluebird warning about promises inside of next
//   })
//   .catch(next);
// });

// router.get('/:wakaId', function (req, res) {
//   res.json(req.waka);
// });