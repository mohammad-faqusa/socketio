//The purpose of expressMain is to be the entrypoint for all Express stuff
const app = require('../server').app;
const io = require('../server').io;

module.exports = app;