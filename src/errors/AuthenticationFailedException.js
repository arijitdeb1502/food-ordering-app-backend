const AppError = require('./AppError');

class AuthenticationFailedException extends AppError {
    constructor (messageCode,message) {
        super(messageCode, message);
      }
}

module.exports = AuthenticationFailedException;