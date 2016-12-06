const Sequelize = require('sequelize');
const db = require('../_db');

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
  	defaultValue: [], //I still want all my scraped waka to end up in the db even if they don't contain matching tokens, just in case I expand the kigo dictionary later
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
  // hooks: {}, //to-do: create a setter method for tokens + hiragana that parses text through python tokenizer module and sets values
});