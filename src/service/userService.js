import * as UsersDao from '../dao/usersDao';

export const getAllUsersService = async () => {
  return await UsersDao.getAllUsers();
};

export const getUserById = async id => {
  return await UsersDao.getUserById(id);
};
