require('dotenv').config({ path: `${__dirname}/../../.env` });

module.exports = {
  dev: {
    client: 'pg',
    connection: {
      port: process.env.DATABASE_PORT,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    migration: {
      directory: `${__dirname}/db/migrations`
    },
    seed: {
      directory: `${__dirname}/db/seeds`
    }
  },
  production: {
    client: 'pg',
    connection: {
      port: process.env.DATABASE_PORT,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    migration: {
      directory: `${__dirname}/db/migrations`
    },
    seed: {
      directory: `${__dirname}/db/seeds`
    }
  }
};
