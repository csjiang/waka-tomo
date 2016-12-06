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
		defaultValue: '新年',
	},
	reading: {
		type: Sequelize.STRING,
		defaultValue: '',
	},
	synonyms: {
		type: Sequelize.ARRAY(Sequelize.STRING),
		defaultValue: [],
	},
	// category: { //not yet implemented
	// 	type: Sequelize.STRING,
	// 	defaultValue: '',
	// }
}, {
	getterMethods: {},
	instanceMethods: {},
	classMethods:{
		findBySeason: function (season) {
			return this.findAll({
				where: {
					season: {
						$like: `%${season}%`
					}
				}
			})
			.then(function (foundKigo) {
				return foundKigo;
			});
		}
	},
	hooks: {},
});

module.exports = Kigo;
