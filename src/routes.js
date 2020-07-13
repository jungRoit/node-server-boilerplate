import express from 'express';
import usersController from './controllers/usersController';
import loginController from './controllers/loginController';
import signupController from './controllers/signupController';
import refreshTokenController from './controllers/refreshTokenController';

import checkAuthorization from './middlewares/checkAuthorization';
import {genericErrorHandler} from './middlewares/errorHandler';

const Router = express.Router();

Router.get('/', (req, res, next) => {
  res.json({ message: 'welcome to the API' });
});

Router.use('/sign-up', signupController);
Router.use('/login', loginController);

Router.use('/refresh-token', refreshTokenController);

Router.use(checkAuthorization);
Router.use('/users', usersController);
Router.use(genericErrorHandler);

export default Router;
