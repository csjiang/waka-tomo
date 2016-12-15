const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('kigo', {
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
		type: Sequelize.STRING,
		defaultValue: '',
	},
	synonyms: {
		type: Sequelize.ARRAY(Sequelize.STRING),
		defaultValue: [],
	},
	category: {
		type: Sequelize.STRING,
		defaultValue: undefined,
	}
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
			})
		},

		findByCategory: function(category) {
			return this.findAll({
				where: { category }
			})
			.then(function (foundKigo) {
				return foundKigo;
			})
		}
	},
	hooks: {},
});