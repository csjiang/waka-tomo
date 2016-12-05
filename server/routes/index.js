'use strict';

const router = require('express').Router();
module.exports = router;

router.use('/kigo', require('./Kigo'));
router.use('/waka', require('./Waka'));

router.use(function (req, res) {
  res.status(404).send('Route not found');
});
