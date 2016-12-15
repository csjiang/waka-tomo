const Sequelize = require('sequelize');
const db = require('../_db');
const tokenize = require('./segmenter');

module.exports = db.define('waka', {
  text: {
  	type: Sequelize.STRING,
  	allowNull: false,
  },
  // text_hiragana: { // not yet implemented
  // 	type: Sequelize.STRING,
  // 	defaultValue: '',
  // },
  tokens: {
  	type: Sequelize.ARRAY(Sequelize.STRING),
  	defaultValue: []
  },
  author: {
  	type: Sequelize.STRING,
  	allowNull: false,
  },
}, {
  // getterMethods: {},
  // instanceMethods: {},
  classMethods:{
    findByAuthor: function (author) {
      return this.findAll({
        where: {
          author: {
            $like: `%${author}%`
          }
        }
      })
      .then(function (foundWaka) {
        return foundWaka;
      });
    }, 
    findByToken: function (token) {
      return this.findAll({
        where: {
          tokens: {
            $contains: token
          }
        },
      })
      .then(function (foundWaka) {
        return foundWaka;
      });
    }
  },
  hooks: {
    beforeCreate: function(waka, options) {
      var noParen = waka.text.replace(/\ *\([^)]*\) */g, '');
      waka.tokens = tokenize.segment(noParen) 
    }
  }
});

