exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.string('id').notNullable();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('lastLogin');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
