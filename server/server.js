'use strict'

require('dotenv').config();
const express = require('express');
const app = express();

const notFoundHandler = require('./handlers/404.js');
const errorHandler = require('./handlers/500.js');
const timeStamper = require('./middleware/stamper.js');

const port = process.env.PORT || 3000;

// Route Definitions 
app.get('/', getHomePage);
app.get('/data', timeStamper, getData);
app.get('/bad', forceError);

app.use('*', notFoundHandler);
app.use(errorHandler);

// Route Handler Functions
function getHomePage(req, res) { 
    res.status(200).send('Hello World')
}

function getData(req, res) {
    let outputObject = { 
        10: "even",
        5: "odd",
        "time": req.timestamp // We got this from the middleware
    }
    res.status(200).json(outputObject);
}

function forceError(req, res, next) {
    // Throw the new error message of "You Messed Up"
    next('you messed up')
}

function start(port) {
    app.listen(port, () => {
        console.log(`Server up on port ${port}`)
    });
}

module.exports = {
    app: app, 
    start: start
}