const AppError = require('./AppError');

class SaveAddressException extends AppError {
    constructor (messageCode,message) {
        super(messageCode, message);
      }
}

module.exports = SaveAddressException;