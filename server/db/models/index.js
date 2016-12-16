'use strict';

const Kigo = require('./kigo');
const Waka = require('./waka');

Kigo.hasMany(Waka);

module.exports = {
  Kigo,
  Waka,
};

// Waka.findByToken('七夕')
// .then(found => console.log(found))
// .catch(console.error);