import knex from '../db/knex';
import { generateUUID } from '../utils/uuid';
export const getAllUsers = async () => {
  return await knex.select().from('users');
};

export const getUserById = async id => {
  return await knex
    .select()
    .from('users')
    .where('id', id);
};

export const getUserByUsername = async username => {
  return await knex
    .select()
    .from('users')
    .where('username', username);
};

export const insertUser = async user => {
  return await knex('users').insert({
    id: generateUUID(),
    username: user.username,
    password: user.password
  });
};

export const updateLastLogin = async user => {
  return await knex('users')
    .update({ lastLogin: user.lastLogin })
    .where({ id: user.id });
};
