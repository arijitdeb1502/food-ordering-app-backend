const AppError = require('./AppError');

class AuthorizationFailedException extends AppError {
    constructor (messageCode,message) {
        super(messageCode, message);
      }
}

module.exports = AuthorizationFailedException;