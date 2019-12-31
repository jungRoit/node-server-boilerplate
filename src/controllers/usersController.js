import { Router } from 'express';
import * as userService from '../service/userService';

const usersController = Router();

usersController.get('/', async (req, res, next) => {
  const response = await userService.getAllUsers();
  res.send(response);
});

usersController.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const response = await userService.getUserById(id);
  res.send(response);
});

export default usersController;
