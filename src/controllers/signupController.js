import { Router } from 'express';

import * as userService from '../service/userService';

import usernameValidator from '../middlewares/usernameValidator';
import passwordValidator from '../middlewares/passwordValidator';
import rePasswordValidator from '../middlewares/rePasswordValidator';

import bcrypt from 'bcryptjs';
import { generateUUID } from '../utils/uuid';

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
        res
          .status(409)
          .header(req.header)
          .send({
            message: 'Username already exist'
          });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).send({
              message: 'Something went wrong'
            });
          }

          userService.insertUser({
            id: generateUUID(),
            username: req.body.username,
            password: hash
          });
        });
        res.status(200).send({
          message: 'user created succesfully'
        });
      }
    } catch (error) {
      res.status(500).send({
        message: 'Internal Server Error',
        error: error.toString()
      });
    }
  }
);

export default signupController;
