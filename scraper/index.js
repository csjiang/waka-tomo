const scrape_kigo = require('./kigo_scraper');
const scrape_categories = require('./category_scraper');

const db = require('../server/db/_db.js');

//run this file to seed the db 

db.sync({force : true})
	.then(() => console.log('Finished syncing the database!'))
	.then(() => scrape_kigo())
	.then(() => console.log('Finished populating the database!'))
	.then(() => scrape_categories())
	.then(() => console.log('Finished updating the database!'))
	.catch(console.error);