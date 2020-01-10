import * as GenericDao from '../dao/genericDao';

import MODELS from '../models/models';

export const registerToken = async refreshToken => {
  return await GenericDao.insert('refreshToken', refreshToken);
};

export const getTokenDetailsByToken = async token => {
  return await GenericDao.getBy('refreshToken', token);
};

export const unregisterToken = async refreshToken => {
  return await GenericDao.remove('refreshToken', refreshToken);
};
