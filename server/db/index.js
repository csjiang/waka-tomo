const db = require('./_db');

require('./models');
const Waka = require('./models/Waka');
const Kigo = require('./models/Kigo');


Waka.belongsToMany(Kigo, { through: 'name' });
Kigo.belongsToMany(Waka, { through: 'tokens' }); // cyclic dependency? Ask at office hours

//for testing
// module.exports = db; 


var syncedDbPromise = db.sync();

syncedDbPromise.then(function () {
  console.log('Sequelize models synced to PostgreSQL');
});

module.exports = syncedDbPromise;