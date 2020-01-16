import BadRequest from '../error/BadRequest';

export default (req, res, next) => {
  // compare password and re-password
  if (req.body.password !== req.body.rePassword) {
    throw new BadRequest({
      message: 'Password mismatch',
      details: "password doesn't match with re-password",
      code: 400
    });
  }

  next();
};
