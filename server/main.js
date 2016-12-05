'use strict';

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import db from './models';
import path from 'path';

const app = express();

// logging and body-parsing
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(__dirname + '/public'));

// serve dynamic routes
app.use(require('../routes'));

// failed to catch req above means 404, forward to error handler
app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404);
    } else {
        next(null);
    }

});

// handle any errors
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// listen on a port
const port = 1156;
app.listen(port, function () {
  console.log('The server is listening closely on port', port);
  db.sync()
  .then(function () {
    console.log('Synchronated the database');
  })
  .catch(function (err) {
    console.error('ERROR ERROR ERROR', err, err.stack);
  });
});
