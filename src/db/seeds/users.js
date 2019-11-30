exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: '7b533bfb-708c-458b-9417-e2f4492512df',
          username: 'admin',
          password: 'admin123'
        },
        {
          id: '5f09979d-7a72-4d49-a067-464b2a1f27c8',
          username: 'roit',
          password: 'roit123'
        },
        {
          id: '5f09979d-7a72-4d49-a067-464b2a1f27c8',
          username: 'peter',
          password: 'parker'
        }
      ]);
    });
};
