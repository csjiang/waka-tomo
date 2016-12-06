'use strict';
const path = require('path');
const Sequelize = require('sequelize');
const DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;

// const db = new Sequelize('postgres://localhost:5432/wakatomo');

// module.exports = db;

// create the database instance
module.exports = new Sequelize(DATABASE_URI, {
  logging: false, // set to console.log to see the raw SQL queries
  native: true // lets Sequelize know we can use pg-native for ~30% more speed
});