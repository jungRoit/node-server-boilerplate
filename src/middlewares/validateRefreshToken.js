import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default (req, res, next) => {
  if (!req.body.refreshToken) {
    res.status(401).send({
      error: 'Empty Refresh Token'
    });
  } else {
    try {
      const user = jwt.verify(req.body.refreshToken, process.env.SECRET_KEY);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).send({
        message: 'Invalid Token',
        error: error
      });
    }
  }
};
