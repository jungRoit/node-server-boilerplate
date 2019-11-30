module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/vue-db',
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
