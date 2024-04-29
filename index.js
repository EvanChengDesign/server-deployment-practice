'use strict';

require('dotenv').config();

const server = require('./server');

console.log(process.env.PORT);
server.start(process.env.PORT);