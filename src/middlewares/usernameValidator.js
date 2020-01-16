import BadRequest from '../error/BadRequest';

export default (req, res, next) => {
  //username must be atleast 6 letter long
  if (!req.body.username || req.body.username.length < 6) {
    throw new BadRequest({
      message: 'Invalid Username',
      details: 'please enter a username with atleast 6 letters',
      code: 400
    });
  }

  if (req.body.username.indexOf(' ') !== -1) {
    throw new BadRequest({
      message: 'Invalid Username',
      details: 'Username cannot have spaces',
      code: 400
    });
  }

  if (!isNaN(req.body.username.charAt(0))) {
    throw new BadRequest({
      message: 'Invalid Username',
      details: 'Username cannot start with number',
      code: 400
    });
  }

  next();
};
