export const genericErrorHandler = (Error, req, res, next) => {
  const stack = Error.stack.split('\n');
  stack.splice(0, 1);
  if (Error.message && Error.code) {
    const error = {
      message: Error.message,
      data: {
        details: Error.details,
        trace: stack
      }
    };
    res.status(Error.code).json(error);
  } else {
    const error = {
      message: 'Internal Server Error',
      data: {
        details: Error.toString(),
        trace: stack
      }
    };
    res.status(500).json(error);
  }
};
