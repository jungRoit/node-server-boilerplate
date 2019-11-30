import express from 'express';
import usersController from './controllers/usersController';

const Router = express.Router();

Router.get('/', (req, res, next) => {
  res.json({ message: 'welcome to the API' });
});

Router.use('/users', usersController);

export default Router;
