export default (req, res, next) => {
  //username must be atleast 6 letter long
  if (!req.body.username || req.body.username.length < 6) {
    res.status(400).send({
      message: 'please enter a username with atleast 6 letters'
    });
  }

  next();
};
