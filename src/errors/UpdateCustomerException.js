const AppError = require('./AppError');

class UpdateCustomerException extends AppError {
    constructor (messageCode,message) {
        super(messageCode, message);
      }
}

module.exports = UpdateCustomerException;