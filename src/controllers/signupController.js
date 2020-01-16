import { Router } from 'express';

import * as userService from '../service/userService';

import usernameValidator from '../middlewares/usernameValidator';
import passwordValidator from '../middlewares/passwordValidator';
import rePasswordValidator from '../middlewares/rePasswordValidator';

import bcrypt from 'bcryptjs';
import { generateUUID } from '../utils/uuid';

import BadRequest from '../error/BadRequest';

const signupController = Router();

signupController.post(
  '/',
  usernameValidator,
  passwordValidator,
  rePasswordValidator,
  async (req, res, next) => {
    try {
      const user = await userService.getUserByUsername(req.body.username);
      if (user) {
        throw new BadRequest({
          message: 'Username already exist',
          details: `${req.body.username} already exists, Please use another username`,
          code: 409
        });
      } else {
        const hash = await bcrypt.hash(req.body.password, 10);

        await userService.insertUser({
          id: generateUUID(),
          username: req.body.username,
          password: hash
        });

        res.status(200).send({
          message: 'user created succesfully'
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

export default signupController;
