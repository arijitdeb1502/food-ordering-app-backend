const AppError = require('./AppError');

class CategoryNotFoundException extends AppError {
    constructor (messageCode,message) {
        super(messageCode, message);
      }
}

module.exports = CategoryNotFoundException;