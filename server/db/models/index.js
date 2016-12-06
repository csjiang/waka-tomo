'use strict';

const Kigo = require('./kigo');
const Waka = require('./waka');

Kigo.hasMany(Waka);

module.exports = {
  Kigo,
  Waka,
};
