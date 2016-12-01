const Sequelize = require('sequelize');
const db = require('./_db');

const Waka = db.define('waka', {
  text: {
  	type: Sequelize.STRING,
  	allowNull: false,
  },
  text_hiragana: {
  	type: Sequelize.STRING,
  	allowNull: false,
  },
  tokens: {
  	type: Sequelize.Array(Sequelize.STRING),
  	allowNull: false,
  },
  author: {
  	type: Sequelize.STRING,
  	allowNull: false,
  },
});

module.exports = Waka;
