import * as UsersDao from '../dao/usersDao';

export const getAllUsers = async () => {
  return await UsersDao.getAllUsers();
};

export const getUserById = async id => {
  return await UsersDao.getUserById(id);
};

export const getUserByUsername = async username => {
  return await UsersDao.getUserByUsername(username);
};

export const insertUser = async user => {
  return await UsersDao.insertUser(user);
};

export const updateLastLogin = async user => {
  return await UsersDao.updateLastLogin(user);
};
