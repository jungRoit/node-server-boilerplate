exports.up = function(knex) {
  return knex.schema.createTable('refresh_tokens', table => {
    table
      .string('refreshToken')
      .notNullable()
      .unique(),
      table
        .string('userId')
        .references('id')
        .inTable('users')
        .notNullable(),
      table.timestamp('issuedAt');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('');
};
