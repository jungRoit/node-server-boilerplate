const dbConfig = require('./knexfile');

const environment = process.env.ENV || 'dev';
const config = dbConfig[environment];

module.exports = require('knex')(config);
