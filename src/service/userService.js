import * as genericDao from '../dao/genericDao';

export const getAllUsers = async () => {
  return await genericDao.getAll('users');
};

export const getUserById = async id => {
  return await genericDao.getBy('users', { id: id });
};

export const getUserByUsername = async username => {
  return await genericDao.getBy('users', { username: username });
};

export const insertUser = async user => {
  return await genericDao.insert('users', user);
};

export const updateLastLogin = async user => {
  return await genericDao.update(
    'users',
    { lastLogin: user.lastLogin },
    { id: user.id }
  );
};
