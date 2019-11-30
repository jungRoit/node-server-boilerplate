import knex from '../db/knex';

export const getAllUsers = async () => {
  return await knex.select().from('users');
};

export const getUserById = async id => {
  return await knex
    .select()
    .from('users')
    .where('id', id);
};
