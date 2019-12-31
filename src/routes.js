import express from 'express';
import usersController from './controllers/usersController';
import loginController from './controllers/loginController';
import signupController from './controllers/signupController';

const Router = express.Router();

Router.get('/', (req, res, next) => {
  res.json({ message: 'welcome to the API' });
});

Router.use('/users', usersController);
Router.use('/sign-up', signupController);
Router.use('/login', loginController);

export default Router;
