import getTokenFromHeader from '../utils/getTokenFromHeader';

export default (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    res.status(401).send({
      error: 'Invalid Token'
    });
  } else {
    next();
  }
};
