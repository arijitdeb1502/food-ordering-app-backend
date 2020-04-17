const Customer = require('../db/model/customer');
const responses = require('../constants/response');

const signup = async ({ first_name, last_name , email_address , contact_number, password }) => {
    try {

      const customer = await Customer.findOne({ contact_number });
      if (customer) {
          throw new Error(responses.responseDetails.customerSignupExceptions.duplicateContactException);
      }
      
      const newCustomer = new Customer({ first_name, last_name , email_address , contact_number,password });
      let result = await newCustomer.save();
  
      return result.toObject();
      
    } catch (error) {
      console.log('Something went wrong: customerService: signup', error);
      throw new Error(error);
    }
  }

  module.exports = {
      signup: signup
  }