import { Router } from 'express';

import validateRefreshToken from '../middlewares/validateRefreshToken';

import tokenExpirationTime from '../config/constants/tokenExpirationTime';

import * as refreshTokenService from '../service/refreshTokenService';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const refreshTokenController = Router();

refreshTokenController.post(
  '/',
  validateRefreshToken,
  async (req, res, next) => {
    try {
      if (!req.user || !req.user.id || !req.user.username) {
        res.status(401).send({
          message: 'Invalid Payload'
        });
      } else {
        const tokenDetails = await refreshTokenService.getTokenDetailsByToken({
          refreshToken: req.body.refreshToken
        });

        if (!tokenDetails) {
          res.status(401).send({
            message: 'Unregistered Token'
          });
        } else {
          const user = req.user;

          // unregister previous refresh token
          const del = await refreshTokenService.unregisterToken({
            refreshToken: req.body.refreshToken
          });
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

          //register refresh token
          const refreshTokenObject = {
            refreshToken: refreshToken,
            userId: user.id,
            issuedAt: new Date().toUTCString()
          };
          const tokenRes = await refreshTokenService.registerToken(
            refreshTokenObject
          );

          res.status(200).send({
            message: 'Token Refreshed Successfully',
            accessToken: `Bearer ${accessToken}`,
            refreshToken: refreshToken
          });
        }
      }
    } catch (error) {
      res.status(500).send({
        message: 'Internal Server Error',
        error: error.toString()
      });
    }
  }
);

export default refreshTokenController;
