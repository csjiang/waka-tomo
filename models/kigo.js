const Sequelize = require('sequelize');
const db = require('./_db');

const Kigo = db.define('kigo', {
	name: {
	  	type: Sequelize.STRING,
	  	allowNull: false,
	},
	definition: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	season: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	reading: {
		type: Sequelize.Array(Sequelize.STRING),
		allowNull: false,
	},
	synonyms: {
		type: Sequelize.Array(Sequelize.STRING),
	},
});

module.exports = Kigo;
