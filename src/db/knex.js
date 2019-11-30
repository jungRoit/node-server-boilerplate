const dbConfig = require('./knexfile');

const environment = process.env.ENV || 'development';
const config = dbConfig[environment];

module.exports = require('knex')(config);
