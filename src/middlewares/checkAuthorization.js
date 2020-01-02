import getTokenFromHeader from '../utils/getTokenFromHeader';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    res.status(401).send({
      error: 'Empty Token'
    });
  } else {
    try {
      jwt.verify(token, process.env.SECRET_KEY);
      next();
    } catch (error) {
      res.status(401).send({
        message: 'Invalid Token',
        error: error
      });
    }
  }
};
