const AppError = require('./AppError');

class RestaurantNotFoundException extends AppError {
    constructor (messageCode,message) {
        super(messageCode, message);
      }
}

module.exports = RestaurantNotFoundException;