const AppError = require('./AppError');

class SignUpRestrictedException extends AppError {
    constructor (messageCode,message) {
        super(messageCode, message);
      }
}

module.exports = SignUpRestrictedException;