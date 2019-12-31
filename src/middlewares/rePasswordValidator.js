export default (req, res, next) => {
  // compare password and re-password
  if (req.body.password !== req.body.rePassword) {
    res.status(400).send({
      message: "Password doesn't match"
    });
  }

  next();
};
