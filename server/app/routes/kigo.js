'use strict';

const express = require('express');
const mime = require('mime');
const router = express.Router();
const models = require('../../db/models');
const Kigo = models.Kigo;
const Waka = models.Waka;

module.exports = router;

router.get('/', function(req, res, next) {
	Kigo.findAll({})
	.then(kigo => res.json(kigo))
	.catch(next);
});

router.param('kigoId', (req, res, next, id) => {
  Kigo.findById(id)
  .then(function (kigo) {
    if (!kigo) {
      const err = Error('Entry not found');
      err.status = 404;
      throw err
    }
    req.kigo = kigo;
    next();
    return null; // silences bluebird warning about promises inside of next
  })
  .catch(next);
});

router.get('/:kigoId', (req, res) => {
  res.json(req.kigo);
});

router.get('/:kigoId/waka_matches', (req, res, next) => {
  Waka.findByToken(req.kigo.name)
  .then(wakas => res.json(wakas))
  .catch(next);
});

router.get('/season/:seasonName', (req, res, next) => {
  Kigo.findBySeason(req.params.seasonName)
  .then(kigo => res.json(kigo))
  .catch(next);
});

router.get('/category/:categoryName', (req, res, next) => {
  Kigo.findByCategory(req.params.categoryName)
  .then(kigo => res.json(kigo))
  .catch(next);
});
