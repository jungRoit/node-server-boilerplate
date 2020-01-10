import { Router } from 'express';

import * as userService from '../service/userService';
import * as refreshTokenService from '../service/refreshTokenService';

import usernameValidator from '../middlewares/usernameValidator';
import passwordValidator from '../middlewares/passwordValidator';

import tokenExpirationTime from '../config/constants/tokenExpirationTime';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
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
        res.status(401).send({ error: 'Invalid Username' });
      }

      let user = databaseResponse;

      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        res.status(401).send({ error: 'Incorrect Password' });
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
      const tokenRes = await refreshTokenService.registerToken(
        refreshTokenObject
      );

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
      res.status(500).send({
        message: 'Internal Server Error',
        error: error.toString()
      });
    }
  }
);

export default loginController;
