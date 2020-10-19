const AppError = require('./AppError');

class InvalidRatingException extends AppError {
    constructor (messageCode,message) {
        super(messageCode, message);
      }
}

module.exports = InvalidRatingException;