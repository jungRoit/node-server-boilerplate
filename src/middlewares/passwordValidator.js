import BadRequest from '../error/BadRequest';

export default (req, res, next) => {
  //password length must be 6 letters long
  if (!req.body.password || req.body.password.length < 6) {
    throw new BadRequest({
      message: 'Invalid Password',
      details: 'please enter a password with atleast 6 letters',
      code: 400
    });
  }

  next();
};
