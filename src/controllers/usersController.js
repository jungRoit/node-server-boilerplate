import { Router } from 'express';
import * as userService from '../service/userService';

const usersController = Router();

usersController.get('/', async (req, res, next) => {
  try {
    const response = await userService.getAllUsers();
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

usersController.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await userService.getUserById(id);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

export default usersController;
