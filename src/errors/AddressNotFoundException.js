const AppError = require('./AppError');

class AddressNotFoundException extends AppError {
    constructor (messageCode,message) {
        super(messageCode, message);
      }
}

module.exports = AddressNotFoundException;