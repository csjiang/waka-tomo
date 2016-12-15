const db = require('./_db');

require('./models');

// Waka.hasMany(Kigo);
// Kigo.hasMany(Waka); // cyclic dependency? Ask at office hours

// for testing
// module.exports = db; 


var syncedDbPromise = db.sync();

syncedDbPromise.then(function () {
  console.log('Sequelize models synced to PostgreSQL');
});

module.exports = syncedDbPromise;