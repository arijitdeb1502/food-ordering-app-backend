const Customer = require('../db/model/customer');
// const responses = require('../constants/response');
const SignUpRestrictedException = require('../errors/SignUpRestrictedException');

const signup = async ({ first_name, last_name , email_address , contact_number, password }) => {
    try {
        
      const customer = await Customer.findOne({ contact_number });
      if (customer) {
          throw new SignUpRestrictedException('SGR-001', 'This contact number is already registered! Try other contact number.');
      }
      
      const newCustomer = new Customer({ first_name, last_name , email_address , contact_number,password });
      let result = await newCustomer.save();
      return result.toObject();
      
    } catch (error) {
      console.log('Something went wrong: customerService: signup', error);
      throw new Error(error);
    }
  }

  const findCustomerByPhoneNumber = async(contact_number)=>{

    try {
      const customer = await Customer.findOne({ contact_number });
    }catch(error) {
      console.log('Something went wrong: customerService: findCustomerByPhoneNumber', error);
    }

    return customer;
  }

  module.exports = {
      signup: signup,
      findCustomerByPhoneNumber: findCustomerByPhoneNumber
  }