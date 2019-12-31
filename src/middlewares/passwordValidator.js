export default (req, res, next) => {
  //password length must be 6 letters long
  if (!req.body.password || req.body.password.length < 6) {
    res.status(400).send({
      message: 'please enter a password with atleast 6 letters'
    });
  }

  next();
};
