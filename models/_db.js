const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/waka-tomo', {
  logging: true
});

module.exports = db;