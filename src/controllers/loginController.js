import { Router } from 'express';

import * as userService from '../service/userService';
import * as refreshTokenService from '../service/refreshTokenService';

import usernameValidator from '../middlewares/usernameValidator';
import passwordValidator from '../middlewares/passwordValidator';

import tokenExpirationTime from '../config/constants/tokenExpirationTime';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import BadRequest from '../error/BadRequest';
dotenv.config();

const loginController = Router();

loginController.post(
  '/',
  usernameValidator,
  passwordValidator,
  async (req, res, next) => {
    try {
      let databaseResponse = await userService.getUserByUsername(
        req.body.username
      );
      if (!databaseResponse) {
        throw new BadRequest({
          message: 'Invalid Username',
          details: 'the username is not registered',
          code: 401
        });
      }

      let user = databaseResponse;
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        throw new BadRequest({
          message: 'Incorrect Password',
          details: 'the password you entered is incorrect',
          code: 401
        });
      }

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

      const updatedData = {
        id: user.id,
        lastLogin: new Date().toUTCString()
      };
      await userService.updateLastLogin(updatedData);
      databaseResponse = await userService.getUserByUsername(req.body.username);
      user = databaseResponse;

      //register refresh token
      const refreshTokenObject = {
        refreshToken: refreshToken,
        userId: user.id,
        issuedAt: new Date().toUTCString()
      };
      await refreshTokenService.registerToken(refreshTokenObject);

      res.status(200).send({
        message: 'Login Success',
        accessToken: `Bearer ${accessToken}`,
        refreshToken: refreshToken,
        user: {
          id: user.id,
          username: user.username,
          lastLogin: user.lastLogin
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

export default loginController;
