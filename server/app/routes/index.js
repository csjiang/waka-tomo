'use strict';

const router = require('express').Router();
module.exports = router;

router.use('/kigo', require('./kigo'));
router.use('/waka', require('./waka'));

router.use(function (req, res) {
  res.status(404).send('Route not found');
});
