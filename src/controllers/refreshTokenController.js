import { Router } from 'express';

import validateRefreshToken from '../middlewares/validateRefreshToken';

import tokenExpirationTime from '../config/constants/tokenExpirationTime';

import * as refreshTokenService from '../service/refreshTokenService';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import BadRequest from '../error/BadRequest';
dotenv.config();

const refreshTokenController = Router();

refreshTokenController.post(
  '/',
  validateRefreshToken,
  async (req, res, next) => {
    try {
      if (!req.user || !req.user.id || !req.user.username) {
        throw new BadRequest({
          message: 'Invalid Token',
          details: 'the token is not valid',
          code: 401
        });
      } else {
        const tokenDetails = await refreshTokenService.getTokenDetailsByToken({
          refreshToken: req.body.refreshToken
        });

        if (!tokenDetails) {
          throw new BadRequest({
            message: 'unRegistered Token',
            details: 'the token is not registered in our system',
            code: 401
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
      next(error);
    }
  }
);

export default refreshTokenController;
