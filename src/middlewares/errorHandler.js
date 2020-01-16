export const genericErrorHandler = (Error, req, res, next) => {
  if (Error.message && Error.code) {
    const error = {
      message: Error.message,
      details: Error.details
    };
    res.status(Error.code).json(error);
  } else {
    const error = {
      message: 'Internal Server Error',
      details: Error.toString()
    };
    res.status(500).json(error);
  }
};
