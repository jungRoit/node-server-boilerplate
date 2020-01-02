require('dotenv').config({ path: `${__dirname}/../../.env` });

module.exports = {
  dev: {
    client: 'pg',
    connection: `postgres://${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,

    migration: {
      directory: `${__dirname}/db/migrations`
    },
    seed: {
      directory: `${__dirname}/db/seeds`
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migration: {
      directory: `${__dirname}/db/migrations`
    },
    seed: {
      directory: `${__dirname}/db/seeds`
    }
  }
};
