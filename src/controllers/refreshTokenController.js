import { Router } from 'express';

import validateRefreshToken from '../middlewares/validateRefreshToken';

import tokenExpirationTime from '../config/constants/tokenExpirationTime';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const refreshTokenController = Router();

refreshTokenController.post('/', validateRefreshToken, (req, res, next) => {
  try {
    if (!req.user || !req.user.id || !req.user.username) {
      res.status(401).send({
        error: 'Invalid Payload'
      });
    } else {
      const user = req.user;

      const accessToken = jwt.sign(
        { username: user.username, id: user.id },
        process.env.SECRET_KEY,
        { expiresIn: tokenExpirationTime.accessToken }
      );

      const refreshToken = jwt.sign(
        { username: user.username, id: user.id },
        process.env.SECRET_KEY,
        { expiresIn: tokenExpirationTime.refreshToken }
      );

      res.status(200).send({
        message: 'Token Refreshed Successfully',
        accessToken: `Bearer ${accessToken}`,
        refreshToken: refreshToken
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
      error: error.toString()
    });
  }
});

export default refreshTokenController;
