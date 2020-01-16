import BaseError from './BaseError';

class BadRequest extends BaseError {
  constructor({ message = '', details = '', code = 400 }) {
    super(message);
    this.details = details;
    this.code = code;
  }
}

export default BadRequest;
