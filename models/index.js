const db = require('./_db');

const Waka = require('./waka');
const Kigo = require('./kigo');

Waka.hasMany(Kigo);
Kigo.hasMany(Waka);

module.exports = db;
