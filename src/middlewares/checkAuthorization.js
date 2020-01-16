import getTokenFromHeader from '../utils/getTokenFromHeader';

import BadRequest from '../error/BadRequest';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    throw new BadRequest({
      message: 'Empty Token',
      details: 'invalid token format',
      code: 401
    });
  } else {
    try {
      jwt.verify(token, process.env.SECRET_KEY);
      next();
    } catch (error) {
      throw new BadRequest({
        mesage: 'Invalid Token',
        details: error.toString(),
        code: 401
      });
    }
  }
};
