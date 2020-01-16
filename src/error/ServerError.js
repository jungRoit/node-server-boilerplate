import BaseError from './BaseError';

class ServerError extends BaseError {
  constructor({ message = '', details = '', code = 500 }) {
    super(message);
    this.details = details;
    this.code = code;
  }
}

export default ServerError;
